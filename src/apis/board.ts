import { axiosInstance } from './axiosInstance';

interface WriteArticleProps {
  data: FormData;
}

interface ArticleData {
  postId: number;
  title: string;
  content: string;
  writerId: number;
  writerNickname: string;
  createdAt: string;
  mediaUrls: string[];
}

interface ArticleList {
  content: ArticleData[];
}

export const writeArticle = ({ data }: WriteArticleProps) => {
  return axiosInstance.post(`/posts`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getArticle = (articleId: number) => {
  return axiosInstance.get<ArticleData>(`/posts/${articleId}`);
};

export const getArticleList = () => {
  return axiosInstance.get<ArticleList>('/posts?size=100');
};

export const deleteArticle = (articleId: number) => {
  return axiosInstance.delete(`/posts/${articleId}`);
};
