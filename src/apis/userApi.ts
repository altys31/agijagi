import {
  UserData,
  MemberResponse,
  EditUserRequest,
  EditUserImageRequest,
} from '../types/user';
import { axiosInstance } from './axiosInstance';
import { BabyResponse } from '../types/user';

export const signUp = (user: UserData) => {
  const formData = new FormData();
  formData.append('email', user.email);
  formData.append('password', user.password);
  formData.append('nickname', user.nickname);
  if (user.profileImg) {
    formData.append('profileImage', user.profileImg);
  }
  return axiosInstance.post('/members', formData);
};

export const getAllChildren = async (): Promise<BabyResponse[]> => {
  const response = await axiosInstance.get('/children');
  return response.data;
};

export const getUserInfo = async (
  memberId: number
): Promise<MemberResponse> => {
  const response = await axiosInstance.get(`/members/${memberId}`);
  return response.data;
};

export const getMyInfo = () => {
  return axiosInstance.get<MemberResponse>('/members');
};

export const editUserInfo = async (user: EditUserRequest): Promise<number> => {
  const response = await axiosInstance.patch(`/members`, user);
  return response.status;
};

export const editUserImage = async (
  userImage: EditUserImageRequest
): Promise<number> => {
  const formData = new FormData();
  if (userImage.image) formData.append('profileImage', userImage.image);
  const response = await axiosInstance.post(
    `/members/profile-image/update`,
    formData
  );
  return response.status;
};

export const deleteUserImage = async () => {
  const response = await axiosInstance.post(`/members/profile-image/delete`);
  return response;
};

export const deleteUser = async () => {
  const response = await axiosInstance.delete(`/members`);
  return response;
};
