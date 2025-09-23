import { axiosInstance } from './axiosInstance';

interface WriteCommentProps {
  postId: number;
  content: string;
}

interface CommentData {
  commentId: number;
  parentCommentId: number | null;
  writerId: number;
  writerNickname: string;
  content: string;
  createdAt: string;
}

export const writeComment = ({ postId, content }: WriteCommentProps) => {
  return axiosInstance.post(`/posts/${postId}/comments`, { content });
};

export const deleteComment = (commentId: number) => {
  return axiosInstance.delete(`/comments/${commentId}`);
};

export const getComments = (postId: number) => {
  return axiosInstance.get<CommentData[]>(`/posts/${postId}/comments`);
};
