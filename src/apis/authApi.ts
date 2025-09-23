import { LoginRequest } from '../types/user';
import { axiosInstance } from './axiosInstance';

export const login = async (loginRequest: LoginRequest) => {
  const response = await axiosInstance.post(`/auth/login`, loginRequest);
  return response;
};

export const logout = async () => {
  const response = await axiosInstance.post(`/auth/logout`);
  return response;
};
