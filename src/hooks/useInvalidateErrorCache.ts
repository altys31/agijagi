import { useQueryClient } from '@tanstack/react-query';

const useInvalidateErrorCache = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient
      .getQueryCache()
      .getAll()
      .filter((query) => query.state.status === 'error')
      .forEach((query) => {
        queryClient.invalidateQueries({ queryKey: query.queryKey });
      });
  };

  return { invalidate };
};

export default useInvalidateErrorCache;
