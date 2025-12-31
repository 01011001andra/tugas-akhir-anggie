const { status } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const transactionService = require('../services/transaction.service');

const createTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.createTransaction({
    userId: req.user.id,
    paymentMethod: req.body.paymentMethod || 'QRIS',
    items: req.body,
  });
  console.log(transaction);
  res.status(status.CREATED).send(transaction);
});

const getMyTransactions = catchAsync(async (req, res) => {
  const transactions = await transactionService.getTransactionsByUser(req.user.id);
  res.send(transactions);
});

const getTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.params.transactionId);
  res.send(transaction);
});

const updateTransactionStatus = catchAsync(async (req, res) => {
  const transaction = await transactionService.updateTransactionStatus(req.params.transactionId, req.body.status);
  res.send(transaction);
});

module.exports = {
  createTransaction,
  getMyTransactions,
  getTransaction,
  updateTransactionStatus,
};
