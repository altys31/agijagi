import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFollowers, getChild } from '../../../apis/childApi';
import { getAllDiaries } from '../../../apis/diaryApi';
import SuspenseFallback from '../../../components/common/SuspenseFallback';
import videoIcon from '../../../assets/images/diary/videoIcon.jpeg';
import { BabyProfileCard } from '../../../components/BabyMain/BabyProfileCard/BabyProfileCard';
import { ScheduleCard } from '../../../components/BabyMain/ScheduleCard/ScheduleCard';
import FullCalendar from '../../../components/common/FullCalendar';
import Tab from '../../../components/common/Tab';
import { NoDiary } from '../../../components/Diary/NoDiary/NoDiary';
import { TimelineDiary } from '../../../components/Diary/TimelineDiary/TimelineDiary';
import useModal from '../../../hooks/useModal';
import useChildStore from '../../../stores/useChlidStore';
import { DiaryResponse } from '../../../types/diary';
import { BabyResponse } from '../../../types/user';
import * as s from './style';
import { FollowerResponse } from '../../../types/child';
import { TimeLineDiaryFetch } from './TimeLineDiary/Fetch';

export const BabyMain = () => {
  const [tabMenu, setTabMenu] = useState<string>('1');
  const [renderKey] = useState<number>(0);

  const modal = useModal();
  const navigator = useNavigate();
  const { childId } = useChildStore();

  // Infinite scroll / lazy load for timeline posts
  const INITIAL_LOAD = 2; // render 2-3 items initially as requested
  const LOAD_STEP = 2; // how many to load on each scroll
  const [displayedCount, setDisplayedCount] = useState<number>(INITIAL_LOAD);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleTab = (menu: string) => {
    setTabMenu(menu);
  };

  const {
    data: diaries,
    isLoading: diariesLoading,
    isFetching: diariesFetching,
  } = useQuery<DiaryResponse[]>({
    queryKey: ['diaries', childId],
    queryFn: () => {
      return getAllDiaries(childId);
    },
  });

  const { data: followers = [] } = useQuery<FollowerResponse[]>({
    queryKey: ['followers', childId, renderKey],
    queryFn: async () => {
      return await (
        await getAllFollowers(childId)
      ).data;
    },
  });

  const sortedDiaries = (diaries ?? [])
    .slice()
    .sort(
      (a, b) => new Date(b.wroteAt).getTime() - new Date(a.wroteAt).getTime()
    );

  const { data: child } = useQuery<BabyResponse>({
    queryKey: ['child', childId],
    queryFn: () => {
      if (childId === 0)
        return Promise.reject(new Error('유효하지 않은 childId입니다.'));
      return getChild(childId);
    },
  });

  const handleModalDiary = async (selectedDate: string) => {
    const diaryData = (diaries ?? []).find(
      (item) => moment(item.wroteAt).format('YYYY-MM-DD') === selectedDate
    );

    if (diaryData) {
      modal.push({
        children: (
          <s.ModalBackground>
            <s.CloseIconBox onClick={() => modal.pop()}>
              {s.CloseIcon}
            </s.CloseIconBox>
            <TimelineDiary
              date={moment(diaryData.wroteAt).format('YYYY-MM-DD')}
              urlList={diaryData.mediaUrls}
              urlType={diaryData.mediaTypes}
              DiaryText={diaryData.content}
              child={child}
            />
          </s.ModalBackground>
        ),
        onClose: () => {},
        animation: 'center',
      });
    }
  };

  // 탭 변경 시 또는 다이어리 데이터 변경 시 displayedCount 초기화
  useEffect(() => {
    setDisplayedCount(INITIAL_LOAD);
  }, [diaries, tabMenu]);

  // 뷰포트의 끝에 도달하면 더 많은 게시물을 로드하는 IntersectionObserver 설정
  useEffect(() => {
    if (tabMenu !== '1') return; // only active on timeline tab
    if ((diaries ?? []).length <= displayedCount) return; // nothing to load

    const el = loadMoreRef.current;
    if (!el) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDisplayedCount((prev) =>
              Math.min(prev + LOAD_STEP, (diaries ?? []).length)
            );
          }
        });
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );

    observerRef.current.observe(el);

    return () => observerRef.current?.disconnect();
  }, [(diaries ?? []).length, displayedCount, tabMenu]);

  return (
    <>
      <BabyProfileCard child={child} followers={followers} />
      <ScheduleCard />
      <s.IconBoxContainer>
        {child?.authority === 'WRITE' && (
          <s.WriteIconBox onClick={() => navigator('/family/writing')}>
            {s.WriteIcon}
          </s.WriteIconBox>
        )}
      </s.IconBoxContainer>
      <s.TapWrapper>
        <Tab
          selected="1"
          size="md"
          color="primary"
          onChange={(value) => {
            handleTab(value);
          }}
        >
          <Tab.Item value="1">타임라인</Tab.Item>
          <Tab.Item value="2">캘린더</Tab.Item>
        </Tab>
      </s.TapWrapper>

      {tabMenu === '1' ? (
        <s.TimelineContainer noDiary={sortedDiaries.length < 1}>
          {diariesLoading || diariesFetching ? (
            <SuspenseFallback height="20rem" />
          ) : sortedDiaries.length > 0 ? (
            <>
              <s.Circle noDiary={sortedDiaries.length < 1} />
              <TimeLineDiaryFetch
                sortedDiaries={sortedDiaries}
                displayedCount={displayedCount}
                loadMoreRef={loadMoreRef}
                child={child}
              />
            </>
          ) : (
            <NoDiary />
          )}
        </s.TimelineContainer>
      ) : (
        <s.CalendarOutterContainer>
          <s.CalendarInnerContainer>
            <FullCalendar
              locale="kr"
              tileContent={({ date, view }: { date: Date; view: string }) => {
                const formattedDate = moment(date).format('YYYY-MM-DD');
                const matchedDate = (diaries ?? []).find(
                  (item) =>
                    moment(item.wroteAt).format('YYYY-MM-DD') === formattedDate
                );
                if (
                  view === 'month' &&
                  matchedDate &&
                  matchedDate.mediaUrls.length > 0
                ) {
                  return (
                    <img
                      src={
                        matchedDate.mediaTypes[0] === 'image'
                          ? matchedDate.mediaUrls[0]
                          : videoIcon
                      }
                      alt="day-image"
                      style={{ width: '100%', height: '100%' }}
                    />
                  );
                }
                return null;
              }}
              onClickDay={(value: Date) => {
                handleModalDiary(moment(value).format('YYYY-MM-DD'));
              }}
            />
          </s.CalendarInnerContainer>
        </s.CalendarOutterContainer>
      )}
    </>
  );
};
export default BabyMain;
