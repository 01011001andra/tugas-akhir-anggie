const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createProduct = async (data) => {
  return prisma.product.create({ data });
};

const queryProducts = async () => {
  return prisma.product.findMany({
    include: { review: { include: { user: true } } },
  });
};

const getProductById = async (id) => {
  return prisma.product.findFirst({
    where: { id },
    include: { review: { include: { user: true } } },
  });
};

const updateProductById = async (id, data) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(status.NOT_FOUND, 'Product not found');
  }

  return prisma.product.update({
    where: { id },
    data,
  });
};

const deleteProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(status.NOT_FOUND, 'Product not found');
  }

  return prisma.product.delete({
    where: { id },
  });
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
