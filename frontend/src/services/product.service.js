import api from "../api/api";

// =======================
// PRODUCTS
// =======================

// Create product (admin)
export const createProduct = (payload) => api.post("/products", payload);

// Get all products
export const getProducts = (params) => api.get("/products", { params });

// Get product by id
export const getProductById = (id) => api.get(`/products/${id}`);

// Update product
export const updateProduct = (id, payload) =>
  api.patch(`/products/${id}`, payload);

// Delete product
export const deleteProduct = (id) => api.delete(`/products/${id}`);
