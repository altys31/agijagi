import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '../../apis/comment';

import useDialog from '../useDialog';

const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    mutationKey: [],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['commentList', postId],
      });
    },
    onError: () => {
      alert('오류가 발생했어요.');
    },
  });

  return { mutate, isPending };
};

export default useDeleteComment;
