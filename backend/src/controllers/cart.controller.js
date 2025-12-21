const { status } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const cartService = require('../services/cart.service');

/**
 * GET /carts/me
 */
const getMyCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByUser(req.user.id);

  if (!cart) {
    return res.send({
      items: [],
      subtotal: 0,
      totalItems: 0,
    });
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.send({
    id: cart.id,
    items: cart.items,
    totalItems: cart.items.reduce((s, i) => s + i.quantity, 0),
    subtotal,
  });
});

/**
 * POST /carts/items
 * body: { productId, quantity }
 */
const addItem = catchAsync(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    throw new ApiError(status.BAD_REQUEST, 'productId is required');
  }

  const item = await cartService.addItemToCart(req.user.id, productId, quantity);

  res.status(status.CREATED).send(item);
});

/**
 * PATCH /carts/items
 * body: { productId, quantity }
 */
const updateItemQty = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity == null) {
    throw new ApiError(status.BAD_REQUEST, 'productId and quantity are required');
  }

  const item = await cartService.updateCartItemQty(req.user.id, productId, quantity);

  res.send(item);
});

/**
 * DELETE /carts/items/:productId
 */
const removeItem = catchAsync(async (req, res) => {
  const { productId } = req.params;

  await cartService.removeItemFromCart(req.user.id, productId);

  res.status(status.NO_CONTENT).send();
});

/**
 * DELETE /carts/me
 */
const deleteMyCart = catchAsync(async (req, res) => {
  await cartService.clearCartByUser(req.user.id);
  res.status(status.NO_CONTENT).send();
});

module.exports = {
  getMyCart,
  addItem,
  updateItemQty,
  removeItem,
  deleteMyCart,
};
