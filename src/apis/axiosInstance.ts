import axios from 'axios';
import guestOnlyRoutes from '../constants/guestOnlyRoutes';

// Allow overriding the API host in development via .env.development
const DEFAULT_API_BASE = 'https://api.password926.site/';
const envBase = process.env.REACT_APP_API_BASE_URL;
const baseURL = envBase || DEFAULT_API_BASE;

export const axiosInstance = axios.create({
  baseURL,
  // During development we sometimes want to emulate an authenticated dev user.
  // App code previously relied on a custom header during dev; keep that behavior
  // so switching to a local mock server is seamless.
  headers: process.env.NODE_ENV === 'development' ? { 'header-login-member': 1 } : undefined,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      !guestOnlyRoutes.includes(window.location.pathname)
    ) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
