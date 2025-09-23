import { useSuspenseQuery } from '@tanstack/react-query';

import { getArticle } from '../../apis/board';

const useGetArticle = (articleId: number) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId),
  });

  if (error && !isFetching) {
    throw error;
  }

  return data;
};

export default useGetArticle;
