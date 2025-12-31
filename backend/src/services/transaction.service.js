const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createTransaction = async ({ userId, items, paymentMethod }) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Items harus berupa array dan tidak boleh kosong');
  }

  return prisma.$transaction(async (tx) => {
    const transactions = [];

    // 🔎 Ambil cart user
    const cart = await tx.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new Error('Cart tidak ditemukan');
    }

    for (const item of items) {
      // 🔎 Ambil product
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error(`Product tidak ditemukan`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Stock ${product.title} tidak cukup`);
      }

      // 🔻 Kurangi stock
      await tx.product.update({
        where: { id: product.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      // 🧾 Buat transaksi
      const trx = await tx.transaction.create({
        data: {
          userId,
          productId: product.id,
          totalPrice: item.price * item.quantity,
          paymentMethod,
          status: 'PENDING',
        },
      });

      transactions.push(trx);
    }

    // 🧹 CLEAR CART (SETELAH TRANSAKSI SUKSES)
    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    // ❗ OPTIONAL
    // kalau kamu mau cart selalu ada → JANGAN delete cart
    // kalau mau cart fresh → delete cart juga
    // await tx.cart.delete({ where: { id: cart.id } });

    return transactions;
  });
};

const getTransactionsByUser = async (userId) => {
  return prisma.transaction.findMany({
    where: { userId },
  });
};

const getTransactionById = async (id) => {
  return prisma.transaction.findFirst({
    where: { id },
  });
};

const updateTransactionStatus = async (id, statusValue) => {
  const trx = await getTransactionById(id);
  if (!trx) {
    throw new ApiError(status.NOT_FOUND, 'Transaction not found');
  }

  return prisma.transaction.update({
    where: { id },
    data: { status: statusValue },
  });
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  getTransactionById,
  updateTransactionStatus,
};
