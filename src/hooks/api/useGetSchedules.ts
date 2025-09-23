import { useQuery } from '@tanstack/react-query';

import { getSchedules } from '../../apis/schedule';

const useGetSchedules = (childId: number, start: string, end: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['schedule', start, end],
    queryFn: () => getSchedules(childId, start, end),
  });

  if (error || isLoading) {
    return [];
  }

  return data!.data;
};

export default useGetSchedules;
