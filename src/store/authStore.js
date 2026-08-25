import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      // =========================
      // STATE
      // =========================
      user: null,
      token: null,
      isAuthenticated: false,

      // =========================
      // LOGIN
      // =========================
      login: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      // =========================
      // LOGOUT
      // =========================
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      // =========================
      // UPDATE USER
      // =========================
      updateUser: (user) => {
        set({
          user,
        });
      },
    }),
    {
      name: "apostille-hub",
    }
  )
);