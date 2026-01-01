const express = require('express');
const auth = require('../../middlewares/auth');
const dashboardController = require('../../controllers/dashboard.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics & summary
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Dashboard summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProducts:
 *                   type: number
 *                   example: 25
 *                 totalUsers:
 *                   type: number
 *                   example: 120
 *                 totalTransactions:
 *                   type: number
 *                   example: 340
 *                 totalRevenue:
 *                   type: number
 *                   example: 15800000
 */
router.get('/summary', auth(), dashboardController.getDashboardSummary);

module.exports = router;
