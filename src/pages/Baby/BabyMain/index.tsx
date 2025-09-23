import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFollowers, getChild } from '../../../apis/childApi';
import { getAllDiaries } from '../../../apis/diaryApi';
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

export const BabyMain = () => {
  const [fileLists, setFileLists] = useState<File[][]>([]); // 각 diary에 대해 File[] 배열 저장
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
  const [tabMenu, setTabMenu] = useState<string>('1');
  const [renderKey, setRenderKey] = useState<number>(0);

  const modal = useModal();
  const navigator = useNavigate();
  const { childId } = useChildStore();

  const handleTab = (menu: string) => {
    setTabMenu(menu);
  };

  const { data: diaries = [] } = useQuery<DiaryResponse[]>({
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

  const sortedDiaries = diaries.sort((a, b) => {
    const dateA = new Date(a.wroteAt).getTime();
    const dateB = new Date(b.wroteAt).getTime();
    return dateB - dateA;
  });

  const { data: child } = useQuery<BabyResponse>({
    queryKey: ['child', childId],
    queryFn: () => {
      if (childId === 0)
        return Promise.reject(new Error('유효하지 않은 childId입니다.'));
      return getChild(childId);
    },
  });

  const handleModalDiary = async (selectedDate: string) => {
    const diaryData = diaries.find(
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
          {sortedDiaries.length > 0 ? (
            <>
              <s.Circle noDiary={sortedDiaries.length < 1} />
              <s.PostContainer>
                {sortedDiaries.map((item, index) => (
                  <TimelineDiary
                    key={index}
                    date={moment(item.wroteAt).format('YYYY-MM-DD')}
                    urlList={item.mediaUrls}
                    urlType={item.mediaTypes}
                    DiaryText={item.content}
                    child={child}
                  />
                ))}
              </s.PostContainer>
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
                const matchedDate = diaries.find(
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
