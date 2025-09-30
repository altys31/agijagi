import styled from '@emotion/styled';
import { TimelineDiary } from '../../../../components/Diary/TimelineDiary/TimelineDiary';
import moment from 'moment';
import { DiaryResponse } from '../../../../types/diary';
import { BabyResponse } from '../../../../types/user';

interface TimeLineDiaryProps {
  sortedDiaries: DiaryResponse[];
  displayedCount: number;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  child?: BabyResponse;
}

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TimeLineDiary = ({
  sortedDiaries,
  displayedCount,
  loadMoreRef,
  child,
}: TimeLineDiaryProps) => {
  return (
    <PostContainer>
      {sortedDiaries.slice(0, displayedCount).map((item, index) => (
        <TimelineDiary
          key={`${item.wroteAt}-${index}`}
          date={moment(item.wroteAt).format('YYYY-MM-DD')}
          urlList={item.mediaUrls}
          urlType={item.mediaTypes}
          DiaryText={item.content}
          child={child}
        />
      ))}
      {/* 스크롤 감지 요소 */}
      <div ref={loadMoreRef} style={{ width: '100%', height: 1 }} />
    </PostContainer>
  );
};
