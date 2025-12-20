import axios from "axios";

// Buat instance axios
const api = axios.create({
  baseURL: "http://localhost:3000", // ganti sesuai API
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");
    // atau sesuaikan key-nya, misalnya: "access_token"

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (opsional handling error)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // contoh: jika token expired
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
