const { status } = require('http-status');
const prisma = require('../../prisma');
const ApiError = require('../utils/ApiError');

const createReview = async (data) => {
  return prisma.review.create({ data });
};

const getReviewsByProduct = async (productId) => {
  return prisma.review.findMany({
    where: { productId },
    include: { user: true },
  });
};

const getReviewById = async (id) => {
  return prisma.review.findFirst({
    where: { id },
  });
};

const deleteReviewById = async (id) => {
  const review = await getReviewById(id);
  if (!review) {
    throw new ApiError(status.NOT_FOUND, 'Review not found');
  }

  return prisma.review.delete({
    where: { id },
  });
};

module.exports = {
  createReview,
  getReviewsByProduct,
  getReviewById,
  deleteReviewById,
};
