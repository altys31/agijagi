import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../../../components/common/ErrorBoundaryFallback';
import SuspenseFallback from '../../../../components/common/SuspenseFallback';
import { TimeLineDiary } from '.';
import { DiaryResponse } from '../../../../types/diary';
import { BabyResponse } from '../../../../types/user';
import { useQueryClient } from '@tanstack/react-query';
import useChildStore from '../../../../stores/useChlidStore';

interface TimeLineDiaryFetchProps {
  sortedDiaries?: DiaryResponse[];
  displayedCount: number;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  child?: BabyResponse;
}

export const TimeLineDiaryFetch = ({
  sortedDiaries: propDiaries,
  displayedCount,
  loadMoreRef,
  child,
}: TimeLineDiaryFetchProps) => {
  const queryClient = useQueryClient();
  const { childId } = useChildStore();

  const cached = queryClient.getQueryData<DiaryResponse[]>([
    'diaries',
    childId,
  ]);

  const effective =
    propDiaries && propDiaries.length > 0 ? propDiaries : cached ?? [];

  const noData =
    (!propDiaries || propDiaries.length === 0) &&
    (!cached || cached.length === 0);

  if (noData) {
    return (
      <ErrorBoundary
        fallbackRender={(props) => (
          <ErrorBoundaryFallback width="100vw" height="20rem" {...props}>
            타임라인을 불러오지 못했어요.
          </ErrorBoundaryFallback>
        )}
      >
        <SuspenseFallback height="15rem" />
      </ErrorBoundary>
    );
  }

  const sorted = [...effective].sort(
    (a, b) => new Date(b.wroteAt).getTime() - new Date(a.wroteAt).getTime()
  );

  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <ErrorBoundaryFallback width="100vw" height="20rem" {...props}>
          타임라인을 불러오지 못했어요.
        </ErrorBoundaryFallback>
      )}
    >
      <TimeLineDiary
        sortedDiaries={sorted}
        displayedCount={displayedCount}
        loadMoreRef={loadMoreRef}
        child={child}
      />
    </ErrorBoundary>
  );
};
