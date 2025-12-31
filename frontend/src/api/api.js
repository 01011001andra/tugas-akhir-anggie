import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// =======================
// REQUEST INTERCEPTOR
// =======================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// RESPONSE INTERCEPTOR
// =======================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Ambil message dari backend
     * urutan aman:
     * 1. error.response.data.message (swagger)
     * 2. error.message (axios)
     * 3. fallback
     */
    const message =
      error?.response?.data?.message || error?.message || "Terjadi kesalahan";

    // TAMPILKAN TOAST ERROR
    toast.error(message);

    // HANDLE TOKEN EXPIRED
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");

      // optional delay biar toast sempat muncul
      setTimeout(() => {
        window.location.href = "/masuk";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default api;
