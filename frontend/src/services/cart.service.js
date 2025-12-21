import api from "../api/api";

// =======================
// CART
// =======================

// Get my cart
export const getMyCart = () => api.get("/carts/me");

// Add item to cart
export const addCartItem = (productId, quantity = 1) =>
  api.post("/carts/items", { productId, quantity });

// Update cart item quantity
export const updateCartItemQty = (productId, quantity) =>
  api.patch("/carts/items", { productId, quantity });

// Remove item from cart
export const removeCartItem = (productId) =>
  api.delete(`/carts/items/${productId}`);

// Clear my cart
export const clearMyCart = () => api.delete("/carts/me");
