import styled from '@emotion/styled';
import moment from 'moment';
import 'moment/locale/ko';
import defaultImg from '../../../assets/images/calendar.png';
import useGetSchedules from '../../../hooks/api/useGetSchedules';
import useChildStore from '../../../stores/useChlidStore';
import theme from '../../../styles/theme';
import Button from '../../common/Button';
import Typhography from '../../common/Typography';
import { useNavigate } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const GridCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 90%;
  height: 100%;
  min-height: 165px;
  max-width: 500px;
  max-height: 200px;
  border-radius: 25px;
  background-color: ${theme.color.tertiary[100]};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const PhotoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  grid-column: 1/2;
  padding-left: 1rem;
`;

export const ContentSection = styled.div`
  grid-column: 2/3;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
`;

export const SchedualContainer = styled.div`
  width: 90%;
  text-align: center;
`;

export const NoSchedualContainer = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  width: 80%;
`;

export const Photo = styled.img`
  width: 100%;
`;

export const ScheduleCard = () => {
  const formattedDate = moment().locale('ko').format('MM월 DD일 (ddd)');
  const today = moment().format('YYYY-MM-DD');
  const { childId } = useChildStore();
  const schedules = useGetSchedules(childId, today, today);
  const navigator = useNavigate();
  const sortedSchedules = schedules.sort((a, b) => {
    return (
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );
  });

  return (
    <Container>
      <GridCard>
        <PhotoSection>
          <Photo src={defaultImg} />
        </PhotoSection>
        <ContentSection>
          <DateContainer>
            <Typhography size="sm" weight="bold">
              오늘의 일정
            </Typhography>
            <Typhography size="sm" color="primary" weight="bold">
              {formattedDate}
            </Typhography>
          </DateContainer>
          {sortedSchedules.length > 0 ? (
            <SchedualContainer>
              <Typhography size="sm" weight="bold">
                {moment(sortedSchedules[0].startDateTime).format('A h시')}
              </Typhography>
              <Typhography size="md" color="primary">
                {sortedSchedules[0].title}
              </Typhography>
              {sortedSchedules.length > 1 && (
                <Typhography size="xs" color="greyScale" shade="500">
                  외 다른 일정 {sortedSchedules.length - 1}개
                </Typhography>
              )}
            </SchedualContainer>
          ) : (
            <NoSchedualContainer>
              <Typhography size="sm" color="greyScale" shade="500">
                오늘 일정이 없어요
              </Typhography>
            </NoSchedualContainer>
          )}

          <ButtonContainer>
            <Button
              size="sm"
              fullWidth={true}
              onClick={() => navigator('/schedule')}
            >
              {sortedSchedules.length > 0 ? '일정 확인하기' : '일정 입력하기'}
            </Button>
          </ButtonContainer>
        </ContentSection>
      </GridCard>
    </Container>
  );
};
