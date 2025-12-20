
// =======================
// REVIEWS
// =======================

import api from "../api/api";

// Create review
export const createReview = (payload) => api.post("/reviews", payload);

// Get reviews by product
export const getReviewsByProduct = (productId) =>
  api.get(`/reviews/product/${productId}`);

// Delete review
export const deleteReview = (id) => api.delete(`/reviews/${id}`);
