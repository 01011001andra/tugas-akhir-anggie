const express = require('express');
const auth = require('../../middlewares/auth');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

router.post('/', auth(), reviewController.createReview);
router.get('/product/:productId', reviewController.getReviewsByProduct);
router.delete('/:reviewId', auth(), reviewController.deleteReview);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Product reviews
 */

/**
 * @swagger
 * /reviews/product/{productId}:
 *   get:
 *     summary: Get reviews by product
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 */
