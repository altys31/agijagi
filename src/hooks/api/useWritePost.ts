import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { writeArticle } from '../../apis/board';

import useDialog from '../useDialog';

const useWritePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { alert } = useDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: writeArticle,
    mutationKey: [],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articleList'],
      });
      navigate(-1);
    },
    onError: () => {
      alert('오류가 발생했어요.');
    },
  });

  return { mutate, isPending };
};

export default useWritePost;
