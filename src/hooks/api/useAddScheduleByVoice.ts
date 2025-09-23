import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addScheduleByVoice } from '../../apis/schedule';

import useDialog from '../useDialog';

const useAddScheduleByVoice = () => {
  const queryClient = useQueryClient();

  const { alert } = useDialog();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addScheduleByVoice,
    mutationKey: [],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule'],
      });
    },
    onError: () => {
      alert('오류가 발생했어요.');
    },
  });

  return { mutateAsync, isPending };
};

export default useAddScheduleByVoice;
