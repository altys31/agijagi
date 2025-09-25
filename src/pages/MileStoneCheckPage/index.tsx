import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Typhography from '../../components/common/Typography';
import theme from '../../styles/theme';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import MileStoneFilter from '../../components/milestone/MileStoneFilter';
import MileStoneCheck from '../../components/milestone/MileStoneCheck';
import {
  getChildInfo,
  getHeightWeightInfo,
  getMilestone,
  MilestoneDetail,
  patchMilestone,
} from '../../apis/milestone';
import useChildStore from '../../stores/useChlidStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh) * 100);
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 20px;
  height: 50px;
  align-items: center;
`;

const CloseButton = styled(XMarkIcon)`
  align-items: center;
  margin-right: 30px;
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
  margin: 10px 20px;
  height: 30px;
`;

const MileStoneContainer = styled.div`
  flex: 1 1 auto;
  background-color: ${theme.color.tertiary[50]};
  overflow-y: auto;
  padding: 10px;
`;

const WarningMessage = styled.div`
  position: fixed;
  text-align: center;
  width: 230px;
  bottom: 220px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.color.danger[500]};
  color: white;
  padding: 15px;
  border-radius: 10px;
  z-index: 1000;
  font-size: ${theme.typography.fontSize.md};
`;

const SuccessMessage = styled.div`
  position: fixed;
  text-align: center;
  width: 230px;
  bottom: 220px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.color.success[500]};
  color: white;
  padding: 15px;
  border-radius: 10px;
  z-index: 1000;
  font-size: ${theme.typography.fontSize.md};
`;

// 태어난지 몇개월 인지 계산하는 함수
const calculateAgeInMonths = (birthDate: Date): number => {
  const today = new Date();

  let yearsDiff = today.getFullYear() - birthDate.getFullYear();
  let monthsDiff = today.getMonth() - birthDate.getMonth();
  const daysDiff = today.getDate() - birthDate.getDate();

  if (monthsDiff < 0) {
    yearsDiff--;
    monthsDiff += 12;
  }

  if (daysDiff < 0) {
    monthsDiff--;
  }
  return Math.floor(yearsDiff * 12 + monthsDiff);
};

const MilestoneCheck = () => {
  const [months, setMonths] = useState<number>(0);
  const [selectedMilestones, setSelectedMilestones] = useState<
    MilestoneDetail[]
  >([]);
  const [success, setSuccess] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const navigate = useNavigate();
  const { childId } = useChildStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: patchMilestone,
    onSuccess: () => {
      setSuccess('마일스톤을 저장했습니다');
      setTimeout(() => setSuccess(''), 1000);
      queryClient.invalidateQueries({
        queryKey: ['milestone', months],
        exact: true, // 이 옵션은 해당 쿼리 키와 정확히 일치하는 쿼리를 무효화함
      });
    },
    onError: () => {
      setWarning('마일스톤을 체크해주세요');
      setTimeout(() => setWarning(''), 2000);
    },
  });

  const childQuery = useQuery({
    queryKey: ['child-', childId],
    queryFn: () => getChildInfo(childId),
  });

  useEffect(() => {
    if (childQuery.data?.data) {
      const birthday = childQuery.data?.data.birthday;
      if (birthday) {
        const birthDate = new Date(birthday);
        const month = calculateAgeInMonths(birthDate);
        setMonths(month);
      }
    }
  }, [childQuery.data]);

  if (childQuery.error) {
    return <>아이 데이터를 불러오지 못했습니다.</>;
  }
  if (childQuery.isLoading) {
    return <>로딩중</>;
  }

  const handleBack = () => {
    navigate('/family/profile');
  };

  const childData = childQuery.data?.data;
  const name = childData?.nickname;
  const weight = childData?.birthWeight;
  const birthday = childData?.birthday;
  const birthDate = new Date(birthday ? birthday : '');

  // 체크박스 선택 처리
  const handleCheckboxChange = (item: MilestoneDetail, isChecked: boolean) => {
    if (isChecked) {
      setSelectedMilestones((prev) => [...prev, item]);
    } else {
      setSelectedMilestones((prev) =>
        prev.filter((milestone) => milestone.id !== item.id)
      );
    }
  };

  const handleMileStoneSave = async () => {
    const milestoneDatas = selectedMilestones.map((item) => ({
      id: item.id,
      currentAmount: item.currentAmount + 1,
    }));

    // 마일스톤 수정 api 호출 (patch)
    mutate({
      childId,
      data: {
        childId: childId,
        milestones: milestoneDatas,
      },
    });
    setSelectedMilestones([]);
  };

  const handlePrev = () => {
    setMonths((prevMonth) => {
      if (prevMonth <= 0) {
        return prevMonth;
      }
      return prevMonth - 1;
    });
  };

  const handleNext = () => {
    setMonths((prevMonth) => {
      if (prevMonth >= 12) {
        return prevMonth;
      }
      return prevMonth + 1;
    });
  };

  return (
    <Wrapper>
      <Title>
        <CloseButton onClick={handleBack} />
        <Typhography size="lg" weight="bold" color="greyScale" shade="800">
          발달 체크
        </Typhography>
        <Button
          size="sm"
          color="primary"
          onClick={handleMileStoneSave}
          disabled={isPending}
        >
          저장
        </Button>
      </Title>
      <Line></Line>
      <FilterContainer>
        <MileStoneFilter
          month={months}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </FilterContainer>
      <MileStoneContainer>
        <MileStoneCheck
          month={months}
          name={name}
          childId={childId}
          birth={birthDate}
          weight={weight}
          selectedMilestones={selectedMilestones}
          handleMileStoneSave={handleMileStoneSave}
          handleCheckboxChange={handleCheckboxChange}
        />
      </MileStoneContainer>

      {warning && <WarningMessage>{warning}</WarningMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </Wrapper>
  );
};

export default MilestoneCheck;
