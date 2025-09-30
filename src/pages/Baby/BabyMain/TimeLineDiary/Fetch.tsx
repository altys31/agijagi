import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../../../components/common/ErrorBoundaryFallback';
import { Suspense } from 'react';
import SuspenseFallback from '../../../../components/common/SuspenseFallback';
import { TimeLineDiary } from '.';
import { DiaryResponse } from '../../../../types/diary';
import { BabyResponse } from '../../../../types/user';
import { getAllDiaries } from '../../../../apis/diaryApi';
import { useQuery } from '@tanstack/react-query';
import useChildStore from '../../../../stores/useChlidStore';

interface TimeLineDiaryFetchProps {
  sortedDiaries: DiaryResponse[];
  displayedCount: number;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  child?: BabyResponse;
}

export const TimeLineDiaryFetch = ({
  sortedDiaries,
  displayedCount,
  loadMoreRef,
  child,
}: TimeLineDiaryFetchProps) => {
  const { childId } = useChildStore();
  const { data: diaries } = useQuery<DiaryResponse[]>({
    queryKey: ['diaries', childId],
    queryFn: () => {
      return getAllDiaries(childId);
    },
  });

  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <ErrorBoundaryFallback width="100vw" height="20rem" {...props}>
          타임라인을 불러오지 못했어요.
        </ErrorBoundaryFallback>
      )}
    >
      <Suspense fallback={<SuspenseFallback height="15rem" />}>
        <TimeLineDiary
          sortedDiaries={sortedDiaries}
          displayedCount={displayedCount}
          loadMoreRef={loadMoreRef}
          child={child}
        />
      </Suspense>
    </ErrorBoundary>
  );
};
