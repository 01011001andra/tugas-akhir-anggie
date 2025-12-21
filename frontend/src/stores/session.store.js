import { create } from "zustand";
import api from "../api/api";

export const useSessionStore = create((set) => ({
  session: null,
  loading: false,
  initialized: false,
  error: null,

  getMe: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/auth/me");

      set({
        session: res.data,
        loading: false,
        initialized: true,
      });
    } catch (err) {
      console.error(err);
      set({
        session: null,
        loading: false,
        initialized: true, // ⬅️ PENTING
      });
    }
  },

  markInitialized: () =>
    set({
      initialized: true,
      loading: false,
    }),
}));
