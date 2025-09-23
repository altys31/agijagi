import { useState } from 'react';
import styled from '@emotion/styled';
import Typhography from '../../components/common/Typography';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ReportFilter from '../../components/Report/ReportFilter';
import ReportList from '../../components/Report/ReportList';
import useChildStore from '../../stores/useChlidStore';
import { useQuery } from '@tanstack/react-query';
import { getChildInfo } from '../../apis/milestone';
import { getReportList } from '../../apis/report';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh) * 100);
`;

const Title = styled.div`
  display: flex;
  margin: 5px 15px 5px 40px;
  height: 42px;
  align-items: center;
`;

const TitleText = styled.div`
  display: flex;
  margin: 0 auto;
`;

const CloseButton = styled(XMarkIcon)`
  display: flex;
  align-items: center;
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: ${theme.color.greyScale[800]};
`;

const Line = styled.hr`
  border: none;
  background-color: ${theme.color.greyScale[400]};
  height: 1px;
  margin: 0;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 15px;
  height: 35px;
`;

const ReportContainer = styled.div`
  flex: 1 1 auto;
  background-color: ${theme.color.tertiary[50]};
  padding: 10px;
  overflow-y: auto;
`;

const today = new Date();
const todayYear = today.getFullYear();

const Report = () => {
  const [year, setYear] = useState<number>(todayYear);
  const { childId } = useChildStore();

  const navigate = useNavigate();

  const childQuery = useQuery({
    queryKey: ['child-', childId],
    queryFn: () => getChildInfo(childId),
  });

  const reportListQuery = useQuery({
    queryKey: ['reportlist-', childId],
    queryFn: () => getReportList(childId),
  });

  if (reportListQuery.error) {
    return <>데이터를 불러오지 못했습니다.</>;
  }
  if (reportListQuery.isLoading) {
    return <>로딩중</>;
  }

  const handleBack = () => {
    navigate('/family/profile');
  };

  const handlePrev = () => {
    setYear((prevYear) => {
      return prevYear - 1;
    });
  };

  const handleNext = () => {
    setYear((prevYear) => {
      if (prevYear === todayYear) {
        return prevYear;
      }
      return prevYear + 1;
    });
  };

  return (
    <Wrapper>
      <Title>
        <TitleText>
          <Typhography size="lg" weight="bold" color="greyScale" shade="800">
            성장 분석 보고서
          </Typhography>
        </TitleText>
        <CloseButton onClick={handleBack} />
      </Title>
      <Line></Line>

      <FilterContainer>
        <ReportFilter
          year={year}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </FilterContainer>

      <ReportContainer>
        <ReportList
          name={childQuery.data?.data.nickname}
          birth={childQuery.data?.data.birthday}
          year={year}
          childId={childId}
          data={reportListQuery.data?.data}
        />
      </ReportContainer>
    </Wrapper>
  );
};

export default Report;
