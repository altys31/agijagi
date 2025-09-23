import { useSuspenseQuery } from '@tanstack/react-query';

import { getLatestRecords } from '../../apis/record';

const queryKey = ['record', 'latest'];

const useGetLatestRecords = (childId: number) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey,
    queryFn: () => getLatestRecords(childId),
  });

  if (error && !isFetching) {
    throw error;
  }

  return data;
};

useGetLatestRecords.queryKey = queryKey;

export default useGetLatestRecords;
