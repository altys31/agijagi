import axios from 'axios';
import guestOnlyRoutes from '../constants/guestOnlyRoutes';

export const axiosInstance =
  process.env.NODE_ENV === 'development'
    ? axios.create({
        baseURL: 'https://api.password926.site/',
        headers: {
          'header-login-member': 1,
        },
        withCredentials: true,
      })
    : axios.create({
        baseURL: 'https://api.password926.site/',
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
