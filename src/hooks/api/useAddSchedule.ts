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
      alert('MSW 환경에서는 지원하지 않는 기능입니다.');
    },
  });

  return { mutate, isPending };
};

export default useAddSchedule;
