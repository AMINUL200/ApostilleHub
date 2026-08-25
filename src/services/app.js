// src/services/api.js

import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
});

// ================================
// REQUEST INTERCEPTOR
// ================================
api.interceptors.request.use(
  (config) => {
    // Get token directly from Zustand
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ================================
    // GET CACHE CONTROL
    // ================================
    if (config.method?.toLowerCase() === "get") {
      config.headers["Cache-Control"] = "no-cache";
      config.headers["Pragma"] = "no-cache";
    }

    // ================================
    // FORMDATA
    // ================================
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================================
// RESPONSE INTERCEPTOR
// ================================
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.errors ||
      error?.response?.statusText ||
      "Something went wrong!";

    console.error("API Error:", message);

    // ================================
    // TOKEN EXPIRED / UNAUTHORIZED
    // ================================
    if (error?.response?.status === 401) {
      // Logout from Zustand
      useAuthStore.getState().logout();

      // Optional redirect
      // if (window.location.pathname !== "/login") {
      //   window.location.href = "/login";
      // }
    }

    return Promise.reject({
      status: error?.response?.status,
      data: error?.response?.data,
      message,
    });
  }
);