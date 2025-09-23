import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { addSchedule } from '../../apis/schedule';

import useDialog from '../useDialog';

const useAddSchedule = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { alert } = useDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: addSchedule,
    mutationKey: [],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule'],
      });

      navigate(-1);
    },
    onError: () => {
      alert('오류가 발생했어요.');
    },
  });

  return { mutate, isPending };
};

export default useAddSchedule;
