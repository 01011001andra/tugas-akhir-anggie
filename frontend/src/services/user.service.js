import api from "../api/api";

// =======================
// USERS
// =======================

// Admin: create user
export const createUser = (payload) => api.post("/users", payload);

// Admin: get users
export const getUsers = (params) => api.get("/users", { params });

// Get user by id
export const getUserById = (id) => api.get(`/users/${id}`);

// Update user
export const updateUser = (id, data) => api.patch(`/users/${id}`, data);

// Delete user
export const deleteUser = (id) => api.delete(`/users/${id}`);
