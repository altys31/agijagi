import { useNavigate } from 'react-router-dom';

import XMarkIcon from '@heroicons/react/16/solid/XMarkIcon';

import * as s from './style';

import Button from '../../common/Button';
import IconButton from '../../common/IconButton';

import useDialog from '../../../hooks/useDialog';
import useDeleteArticle from '../../../hooks/api/useDeleteArticle';

interface ArticleHeaderProps {
  title: string;
  articleId: number;
  isAuthor: boolean;
}

const ArticleHeader = ({ title, articleId, isAuthor }: ArticleHeaderProps) => {
  const { confirm } = useDialog();

  const { mutate, isPending } = useDeleteArticle();

  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    if (!(await confirm('정말로 삭제할까요?'))) {
      return;
    }
    mutate(articleId);
  };

  return (
    <s.Container>
      <s.Icon>
        <IconButton onClick={() => navigate(-1)}>
          <XMarkIcon />
        </IconButton>
      </s.Icon>
      <s.Title>{title}</s.Title>
      {isAuthor && (
        <s.Menu>
          <Button
            color="danger"
            size="sm"
            disabled={isPending}
            onClick={handleDeleteClick}
          >
            삭제
          </Button>
        </s.Menu>
      )}
    </s.Container>
  );
};

export default ArticleHeader;
