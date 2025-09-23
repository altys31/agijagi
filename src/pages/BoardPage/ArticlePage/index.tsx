import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '../../../components/common/ErrorBoundaryFallback';
import SuspenseFallback from '../../../components/common/SuspenseFallback';
import ArticlePageFetch from './Fetch';

interface ArticlePageProps {
  articleId: number;
}

const ArticlePage = ({ articleId }: ArticlePageProps) => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <ErrorBoundaryFallback width="100vw" height="20rem" {...props}>
          게시글을 불러오지 못했어요.
        </ErrorBoundaryFallback>
      )}
    >
      <Suspense fallback={<SuspenseFallback height="20rem" />}>
        <ArticlePageFetch articleId={articleId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ArticlePage;
