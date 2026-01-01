import api from "../api/api";

// =======================
// TRANSACTIONS
// =======================

// Create transaction
export const createTransaction = (payload) =>
  api.post("/transactions", payload);

// Get my transactions
export const getAllTransactions = () => api.get("/transactions/all");

export const getMyTransactions = () => api.get("/transactions/me");

// Get transaction by id
export const getTransactionById = (id) => api.get(`/transactions/${id}`);

// Update transaction status
export const updateTransactionStatus = (id, status) =>
  api.patch(`/transactions/${id}/status`, { status: status.action });
