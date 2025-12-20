const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createTransaction = async (data) => {
  return prisma.transaction.create({ data });
};

const getTransactionsByUser = async (userId) => {
  return prisma.transaction.findMany({
    where: { userId },
  });
};

const getTransactionById = async (id) => {
  return prisma.transaction.findFirst({
    where: { id },
  });
};

const updateTransactionStatus = async (id, statusValue) => {
  const trx = await getTransactionById(id);
  if (!trx) {
    throw new ApiError(status.NOT_FOUND, 'Transaction not found');
  }

  return prisma.transaction.update({
    where: { id },
    data: { status: statusValue },
  });
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  getTransactionById,
  updateTransactionStatus,
};
