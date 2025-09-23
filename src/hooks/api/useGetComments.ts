import { useSuspenseQuery } from '@tanstack/react-query';
import { getComments } from '../../apis/comment';

const useGetComments = (postId: number) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['commentList', postId],
    queryFn: () => getComments(postId),
  });

  if (error && !isFetching) {
    throw error;
  }

  return data;
};

export default useGetComments;
