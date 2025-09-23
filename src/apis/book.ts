import { axiosInstance } from './axiosInstance';

export interface StoryBook {
  childId: number;
  title: string;
  startDate: string;
  endDate: string;
  coverImageIndex: number;
}

export interface StoryBookDetail {
  id: number;
  childId: number;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  coverImageIndex: number;
}

export interface StoryBookPage {
  id: number;
  storyId: number;
  pageNumber: number;
  content: string;
  storyPageImageUrl: string;
}

interface StoryBookProps {
  storyId: number | undefined;
}

export const postStoryBook = async (storybook: StoryBook) => {
  const formData = new FormData();
  formData.append('childId', storybook.childId.toString());
  formData.append('title', storybook.title);
  formData.append('startDate', storybook.startDate);
  formData.append('endDate', storybook.endDate);
  formData.append('coverImageIndex', storybook.coverImageIndex.toString());

  const response = await axiosInstance.post('/stories', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const getStoryBookList = (childId: number) => {
  return axiosInstance.get<StoryBookDetail[]>(`stories?childId=${childId}`);
};

export const getStoryBook = (storyId: number) => {
  return axiosInstance.get<StoryBookDetail>(`stories/${storyId}`);
};

export const getStoryBookPages = (storyId: number) => {
  return axiosInstance.get<StoryBookPage[]>(`stories/${storyId}/pages`);
};

export const deleteStoryBook = ({ storyId }: StoryBookProps) => {
  return axiosInstance.delete(`stories/${storyId}`);
};
