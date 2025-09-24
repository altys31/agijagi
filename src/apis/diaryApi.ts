import {
  DeleteDiaryRequest,
  DiaryRequest,
  EditDiaryRequest,
} from '../types/diary';
import { axiosInstance } from './axiosInstance';

export const getAllDiaries = async (childId: number) => {
  const response = await axiosInstance.get(`/diaries?childId=${childId}`);
  return response.data;
};

export const addDiary = async (diary: DiaryRequest) => {
  const formData = new FormData();
  formData.append('childId', diary.childId.toString());
  formData.append('content', diary.content);
  formData.append('wroteAt', diary.date);
  diary.mediaList.forEach((file, index) => {
    formData.append(`mediaList`, file);
  });

  const response = await axiosInstance.post(`/diaries`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const editDiary = async (request: EditDiaryRequest) => {
  const formData = new FormData();
  formData.append('content', request.content);

  request.removeMediaIdList.forEach((id) => {
    formData.append('removeMediaIdList', id);
  });

  request.newMediaList.forEach((file) => {
    formData.append('newMediaList', file);
    
    /* msw 전용 코드 */
    formData.append(`mediaList`, file);
  });


 
  const response = await axiosInstance.patch(
    `/diaries/${request.storyId}`,
    formData
  );

  return response;
};

export const deleteDiary = async (request: DeleteDiaryRequest) => {
  const removeMediaIdList = request.removeMediaIdList
    ? request.removeMediaIdList.join(' ')
    : null;

  const response = await axiosInstance.delete(`/diaries/${request.storyId}`, {
    data: { removeMediaIdList },
  });

  return response;
};
