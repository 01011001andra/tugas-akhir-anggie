// =======================
// AUTH
// =======================

import api from "../api/api";

export const register = (payload) => api.post("/auth/register", payload);

export const login = (payload) => api.post("/auth/login", payload);

export const logout = (refreshToken) =>
  api.post("/auth/logout", { refreshToken });

export const refreshTokens = (refreshToken) =>
  api.post("/auth/refresh-tokens", { refreshToken });

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (token, password) =>
  api.post(`/auth/reset-password?token=${token}`, { password });

export const sendVerificationEmail = () =>
  api.post("/auth/send-verification-email");

export const verifyEmail = (token) =>
  api.post(`/auth/verify-email?token=${token}`);
