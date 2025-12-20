const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createCart = async (userId) => {
  return prisma.cart.create({
    data: { userId },
  });
};

const getCartByUser = async (userId) => {
  return prisma.cart.findFirst({
    where: { userId },
  });
};

const deleteCartByUser = async (userId) => {
  const cart = await getCartByUser(userId);
  if (!cart) {
    throw new ApiError(status.NOT_FOUND, 'Cart not found');
  }

  return prisma.cart.delete({
    where: { id: cart.id },
  });
};

module.exports = {
  createCart,
  getCartByUser,
  deleteCartByUser,
};
