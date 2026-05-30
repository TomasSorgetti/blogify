import axios, { type AxiosResponse } from "axios";
import { useAuthStore } from "../store/auth";

const API_URI = import.meta.env.VITE_API_URI;

export const publicApi = axios.create({
  baseURL: `${API_URI}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: `${API_URI}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

privateApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${API_URI}/api/auth/refresh`,
          {},
          { withCredentials: true },
        );

        return privateApi.request(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user from the store
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
