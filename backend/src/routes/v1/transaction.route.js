const express = require('express');
const auth = require('../../middlewares/auth');
const transactionController = require('../../controllers/transaction.controller');

const router = express.Router();

router.post('/', auth(), transactionController.createTransaction);
router.get('/me', auth(), transactionController.getMyTransactions);
router.get('/all', auth(), transactionController.getTransactions);
router.get('/:transactionId', auth(), transactionController.getTransaction);
router.patch('/:transactionId/status', auth(), transactionController.updateTransactionStatus);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction management
 */

/**
 * @swagger
 * /transactions/me:
 *   get:
 *     summary: Get my transactions
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 */
