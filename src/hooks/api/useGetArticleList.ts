import { useSuspenseQuery } from '@tanstack/react-query';

import { getArticleList } from '../../apis/board';

const useGetArticleList = () => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['articleList'],
    staleTime: 2000,
    queryFn: getArticleList,
  });

  if (error && !isFetching) {
    throw error;
  }

  return data;
};

export default useGetArticleList;
