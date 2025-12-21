const express = require('express');
const auth = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /carts/me:
 *   get:
 *     summary: Get my cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 */
router.get('/me', auth(), cartController.getMyCart);

/**
 * @swagger
 * /carts/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       "201":
 *         description: Item added
 */
router.post('/items', auth(), cartController.addItem);

/**
 * @swagger
 * /carts/items:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       "200":
 *         description: Item updated
 */
router.patch('/items', auth(), cartController.updateItemQty);

/**
 * @swagger
 * /carts/items/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Item removed
 */
router.delete('/items/:productId', auth(), cartController.removeItem);

/**
 * @swagger
 * /carts/me:
 *   delete:
 *     summary: Clear my cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "204":
 *         description: Cart cleared
 */
router.delete('/me', auth(), cartController.deleteMyCart);

module.exports = router;
