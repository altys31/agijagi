import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { useNavigate } from 'react-router-dom';

import * as s from './style';

import AppBar from '../../components/common/AppBar';
import Button from '../../components/common/Button';
import RecentArticleList from '../../components/Board/RecentArticleList';
import ErrorBoundaryFallback from '../../components/common/ErrorBoundaryFallback';
import IconButton from '../../components/common/IconButton';
import SuspenseFallback from '../../components/common/SuspenseFallback';
import WritePage from './WritePage';

import useModal from '../../hooks/useModal';

import XMarkIcon from '@heroicons/react/16/solid/XMarkIcon';

const BoardPage = () => {
  const modal = useModal();

  const navigate = useNavigate();

  const handleWriteClick = () => {
    modal.push({ children: <WritePage /> });
  };

  return (
    <s.Container>
      <s.AppBar>
        <AppBar>
          <IconButton onClick={() => navigate(-1)}>
            <XMarkIcon />
          </IconButton>
          <AppBar.Title>게시판</AppBar.Title>
          <Button color="success" size="sm" onClick={handleWriteClick}>
            글쓰기
          </Button>
        </AppBar>
      </s.AppBar>
      <main>
        <s.ArticleList>
          <ErrorBoundary
            fallbackRender={(props) => (
              <ErrorBoundaryFallback height="20rem" padding="1rem" {...props}>
                게시글을 불러오지 못했어요.
              </ErrorBoundaryFallback>
            )}
          >
            <Suspense
              fallback={<SuspenseFallback height="20rem" padding="1rem" />}
            >
              <RecentArticleList />
            </Suspense>
          </ErrorBoundary>
        </s.ArticleList>
      </main>
    </s.Container>
  );
};

export default BoardPage;
