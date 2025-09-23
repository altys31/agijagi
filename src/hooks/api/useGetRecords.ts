import { useSuspenseQuery } from '@tanstack/react-query';

import { getRecords } from '../../apis/record';

const queryKey = ['record', 'recent'];

const useGetRecords = (childId: number, start: string, end: string) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey,
    queryFn: () => getRecords(childId, start, end),
  });

  if (error && !isFetching) {
    throw error;
  }

  return data;
};

useGetRecords.queryKey = queryKey;

export default useGetRecords;
