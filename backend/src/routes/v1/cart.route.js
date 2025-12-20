const express = require('express');
const auth = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

router.post('/', auth(), cartController.createCart);
router.get('/me', auth(), cartController.getMyCart);
router.delete('/me', auth(), cartController.deleteMyCart);

module.exports = router;

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
