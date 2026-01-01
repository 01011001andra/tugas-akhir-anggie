// =======================
// DASHBOARD
// =======================

import api from "../api/api";

/**
 * Get dashboard summary
 * (admin / superAdmin only)
 *
 * Response:
 * {
 *   totalProducts: number,
 *   totalUsers: number,
 *   totalTransactions: number,
 *   totalRevenue: number
 * }
 */
export const getDashboardSummary = () => api.get("/dashboard/summary");
