import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRecord } from '../../apis/record';

import useDialog from '../useDialog';

const useDeleteRecord = () => {
  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteRecord,
    mutationKey: [],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['record'],
      });
    },
    onError: () => {
      alert('오류가 발생했어요.');
    },
  });

  return { mutate, isPending };
};

export default useDeleteRecord;
