const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

/**
 * Get or create cart for user
 */
const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  return cart;
};

/**
 * Get my cart (with items & product)
 */
const getCartByUser = async (userId) => {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

/**
 * Add item to cart
 */
const addItemToCart = async (userId, productId, quantity = 1) => {
  const cart = await getOrCreateCart(userId);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new ApiError(status.NOT_FOUND, 'Product not found');
  }

  if (product.stock < quantity) {
    throw new ApiError(status.BAD_REQUEST, 'Insufficient stock');
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  // jika item sudah ada → update qty
  if (existingItem) {
    if (product.stock < existingItem.quantity + quantity) {
      throw new ApiError(status.BAD_REQUEST, 'Insufficient stock');
    }

    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  }

  // jika item baru
  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
      price: product.price, // snapshot harga
    },
  });
};

/**
 * Update item quantity
 */
const updateCartItemQty = async (userId, productId, quantity) => {
  if (quantity < 1) {
    throw new ApiError(status.BAD_REQUEST, 'Quantity must be at least 1');
  }

  const cart = await getOrCreateCart(userId);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product || product.stock < quantity) {
    throw new ApiError(status.BAD_REQUEST, 'Insufficient stock');
  }

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!item) {
    throw new ApiError(status.NOT_FOUND, 'Cart item not found');
  }

  return prisma.cartItem.update({
    where: { id: item.id },
    data: { quantity },
  });
};

/**
 * Remove item from cart
 */
const removeItemFromCart = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!item) {
    throw new ApiError(status.NOT_FOUND, 'Cart item not found');
  }

  return prisma.cartItem.delete({
    where: { id: item.id },
  });
};

/**
 * Clear my cart
 */
const clearCartByUser = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return prisma.cart.delete({
    where: { id: cart.id },
  });
};

module.exports = {
  getOrCreateCart,
  getCartByUser,
  addItemToCart,
  updateCartItemQty,
  removeItemFromCart,
  clearCartByUser,
};
