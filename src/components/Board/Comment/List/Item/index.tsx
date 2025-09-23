import useDeleteComment from '../../../../../hooks/api/useDeleteComment';
import useDialog from '../../../../../hooks/useDialog';

import { getReadableTimeDiff } from '../../../../../utils/getReadableTimeDiff';

import Typhography from '../../../../common/Typography';

import * as s from './style';

interface ItemProps {
  writer: string;
  body: string;
  createdAt: string;
  postId: number;
  commentId: number;
  isAuthor: boolean;
}

const Item = ({
  writer,
  body,
  createdAt,
  postId,
  commentId,
  isAuthor,
}: ItemProps) => {
  const { confirm } = useDialog();

  const { mutate } = useDeleteComment(postId);

  const handleClick = async () => {
    if (!isAuthor || !(await confirm('댓글을 삭제할까요?'))) {
      return;
    }

    mutate(commentId);
  };

  return (
    <s.Container onClick={handleClick}>
      <s.Detail>
        <Typhography color="primary">{writer}</Typhography>
        <Typhography color="secondary" size="sm">
          {getReadableTimeDiff(new Date(createdAt))}
        </Typhography>
      </s.Detail>
      {body}
    </s.Container>
  );
};

export default Item;
