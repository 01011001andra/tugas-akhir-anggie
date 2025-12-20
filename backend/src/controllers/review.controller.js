const { status } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const reviewService = require('../services/review.service');

const createReview = catchAsync(async (req, res) => {
  const review = await reviewService.createReview({
    ...req.body,
    userId: req.user.id,
  });

  res.status(status.CREATED).send(review);
});

const getReviewsByProduct = catchAsync(async (req, res) => {
  const reviews = await reviewService.getReviewsByProduct(req.params.productId);
  res.send(reviews);
});

const deleteReview = catchAsync(async (req, res) => {
  await reviewService.deleteReviewById(req.params.reviewId);
  res.status(status.NO_CONTENT).send();
});

module.exports = {
  createReview,
  getReviewsByProduct,
  deleteReview,
};
