const { status } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');

const createCart = catchAsync(async (req, res) => {
  const cart = await cartService.createCart(req.user.id);
  res.status(status.CREATED).send(cart);
});

const getMyCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByUser(req.user.id);
  res.send(cart);
});

const deleteMyCart = catchAsync(async (req, res) => {
  await cartService.deleteCartByUser(req.user.id);
  res.status(status.NO_CONTENT).send();
});

module.exports = {
  createCart,
  getMyCart,
  deleteMyCart,
};
