const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createTransaction = async ({ userId, items, paymentMethod, proof }) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Items harus berupa array dan tidak boleh kosong');
  }

  if (!paymentMethod) {
    throw new Error('Metode pembayaran wajib diisi');
  }

  if (!proof) {
    throw new Error('Bukti transfer wajib diupload');
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

      // 🧾 Buat transaksi + simpan bukti
      const trx = await tx.transaction.create({
        data: {
          userId,
          productId: product.id,
          totalPrice: item.price * item.quantity,
          paymentMethod,
          proof: proof, // 🔥 SIMPAN BASE64
          status: 'PENDING',
        },
      });

      transactions.push(trx);
    }

    // 🧹 CLEAR CART
    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return transactions;
  });
};

const getTransactionsByUser = async (userId) => {
  return prisma.transaction.findMany({
    where: { userId },
    include: { product: true, user: true },
  });
};
const getTransactions = async () => {
  return prisma.transaction.findMany({ include: { product: true, user: true } });
};

const getTransactionById = async (id) => {
  return prisma.transaction.findFirst({
    where: { id },
    include: { product: true, user: true },
  });
};

const updateTransactionStatus = async (id, action) => {
  // 🔒 validasi action
  if (!['APPROVE', 'REJECT'].includes(action)) {
    throw new ApiError(status.BAD_REQUEST, 'Action harus APPROVE atau REJECT');
  }

  const trx = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!trx) {
    throw new ApiError(status.NOT_FOUND, 'Transaction not found');
  }

  // ❌ tidak boleh update jika sudah final
  if (trx.status !== 'PENDING') {
    throw new ApiError(status.BAD_REQUEST, 'Transaction sudah diproses');
  }

  const nextStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

  return prisma.transaction.update({
    where: { id },
    data: {
      status: nextStatus,
    },
  });
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  getTransactionById,
  updateTransactionStatus,
  getTransactions,
};
