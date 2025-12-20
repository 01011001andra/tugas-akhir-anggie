import api from "../api/api";

// =======================
// CART
// =======================

// Create cart
export const createCart = () => api.post("/carts");

// Get my cart
export const getMyCart = () => api.get("/carts/me");

// Delete my cart
export const deleteMyCart = () => api.delete("/carts/me");
