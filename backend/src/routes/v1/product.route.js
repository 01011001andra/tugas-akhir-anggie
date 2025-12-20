const express = require('express');
const auth = require('../../middlewares/auth');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.post('/', auth(), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProduct);
router.patch('/:productId', auth(), productController.updateProduct);
router.delete('/:productId', auth(), productController.deleteProduct);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products
 *     tags: [Product]
 *     responses:
 *       "200":
 *         description: OK
 */
