import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import Typhography from '../common/Typography';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/24/outline';
import ReportCover from '../../assets/images/report/reportcover.png';
import { useQuery } from '@tanstack/react-query';
import { getReportList, ReportList } from '../../apis/report';

const ReportListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  max-width: 700px;
  height: 130px;
  margin: 0 auto;

  /* 화면 너비가 700px 이상일 때 */
  @media (min-width: 700px) {
    //grid-template-columns: 1fr 1fr; /* 두 개의 열로 변경 */
    //height: 300px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ReportContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  gap: 20px;
  padding: 15px;
  align-items: center;
  animation: smoothAppear 0.6s ease-in-out;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
`;

const BookImage = styled.img`
  min-width: 65px;
  height: 95px;
  border-radius: 10px;
  box-shadow: 5px 8px 20px rgba(0, 0, 0, 0.2);
`;

const DaysText = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 25%;
  width: 100%;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.color.primary[800]};
`;

const LabelContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

const TitleLabel = styled.div`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.color.greyScale[800]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 170px;
  height: 25px;
  align-items: center;
  padding: 5px 10px;
  background-color: ${theme.color.primary[50]};
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid ${theme.color.primary[700]};
`;

const DateIcon = styled(CalendarIcon)`
  width: 20px;
  margin-right: 5px;
  color: ${theme.color.primary[800]};
`;

const CreateText = styled.span`
  display: flex;
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.color.greyScale[600]};
  text-decoration: underline;
  margin-right: 10px;
`;

const timeSince = (date: string) => {
  const today = new Date();
  const createDate = new Date(date);
  const milliSeconds = today.getTime() - createDate.getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

interface ReportListProps {
  name: string | undefined;
  birth: string | undefined;
  year: number;
  childId: number;
  data: ReportList[] | undefined;
}

const ReportListComponet = ({
  name,
  birth,
  year,
  childId,
  data,
}: ReportListProps) => {
  const navigate = useNavigate();

  const onReportSelect = (id: number) => {
    navigate('/milestone-report', { state: { reportId: id } });
  };

  const calculateDays = (date: string) => {
    const createDate = new Date(date);
    const birthDate = new Date(birth ? birth : '');

    // 두 날짜 간의 차이를 밀리초로 계산
    const timeDifference: number = createDate.getTime() - birthDate.getTime();

    // 밀리초를 일 단위로 변환 (1일 = 24시간 * 60분 * 60초 * 1000밀리초)
    const daysDifference: number = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );

    return daysDifference;
  };

  const createMonth = (date: string) => {
    const createDate = new Date(date);
    return createDate.getMonth() + 1;
  };

  const filteredReport = data?.filter((report) => {
    const date = new Date(report.createAt);
    const createdDate = date.getFullYear();
    return year === createdDate;
  });

  const getLatestReportByMonth = (reports: ReportList[] | undefined) => {
    if (!reports) return [];

    const groupedReports = reports.reduce(
      (acc: Record<string, ReportList>, report) => {
        const date = new Date(report.createAt);
        const reportYear = date.getFullYear();
        const reportMonth = date.getMonth() + 1;

        // 주어진 년도에 맞는 보고서만 필터링
        if (reportYear === year) {
          const key = `${reportYear}-${reportMonth}`;

          // 각 월별로 가장 최근의 보고서만 저장
          if (
            !acc[key] ||
            new Date(acc[key].createAt) < new Date(report.createAt)
          ) {
            acc[key] = report;
          }
        }
        return acc;
      },
      {}
    );

    return Object.values(groupedReports);
  };

  // const filteredReport = getLatestReportByMonth(data);
  const monthReport = getLatestReportByMonth(data);

  return (
    <ReportListWrapper>
      {filteredReport?.length === 0 ? (
        <p>생성된 분석 보고서가 없습니다.</p>
      ) : (
        monthReport?.map((report) => (
          <ReportContainer
            key={report.id}
            onClick={() => onReportSelect(report.id)}
          >
            <ImageContainer>
              <BookImage src={ReportCover} alt="report img" />
              <DaysText>
                {' '}
                {calculateDays(report.createAt)} <br /> days
              </DaysText>
            </ImageContainer>

            <LabelContainer>
              <TitleLabel>
                {name} {createMonth(report.createAt)}월 성장 분석 보고서
              </TitleLabel>
              <DateLabel>
                <DateContainer>
                  <DateIcon />
                  <Typhography size="sm" color="greyScale" shade="800">
                    생성일 : {report.createAt.slice(0, 10)}
                  </Typhography>
                </DateContainer>
                <CreateText>{timeSince(report.createAt)}</CreateText>
              </DateLabel>
            </LabelContainer>
          </ReportContainer>
        ))
      )}
      <div style={{ height: '80px' }}></div>
    </ReportListWrapper>
  );
};

export default ReportListComponet;
