import styled from '@emotion/styled';
import theme from '../../styles/theme';
import ProfileIcon from '../common/ProfileIcon/ProfileIcon';
import MileStoneCheckList from './MileStoneCheckList';
import { HeightWeightInfoProps, MilestoneDetail } from '../../apis/milestone';
import MileStoneButton from './MileStoneButton';
import { useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 760px;
  margin: 0 auto;
`;

const IntroBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr;
  gap: 5px;
  padding: 10px 5px;
`;

const IntroImg = styled.div`
  display: flex;
  justify-content: center;
`;

const IntroText = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
  font-size: ${theme.typography.fontSize.sm};
`;

const CheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin-top: 10px;
  margin-bottom: 50px;
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

interface MileStoneProps {
  month: number;
  name: string | undefined;
  childId: number;
  birth: Date | undefined;
  weight: number | null | undefined;
  selectedMilestones: MilestoneDetail[];
  handleMileStoneSave: () => void;
  handleCheckboxChange: (item: MilestoneDetail, isChecked: boolean) => void;
}

const MileStoneCheck = ({
  month,
  name,
  childId,
  birth,
  weight,
  selectedMilestones,
  handleMileStoneSave,
  handleCheckboxChange,
}: MileStoneProps) => {
  const babyMonth = calculateAgeInMonths(birth ? birth : new Date());

  return (
    <Wrapper>
      <IntroBox>
        <IntroImg>
          <ProfileIcon size="md" />
        </IntroImg>
        <IntroText>
          생후 {`${month}`}개월 된 아기들 중 80% 정도가 할 수 있는 발달
          목록입니다. {`${name}`}(이)가 달성한 마일스톤을 체크해보세요.
        </IntroText>
      </IntroBox>
      <MileStoneButton
        weight={weight}
        month={month}
        babyMonth={babyMonth}
        childId={childId}
        selectedMilestones={selectedMilestones}
        handleMileStoneSave={handleMileStoneSave}
      />
      <CheckContainer>
        <MileStoneCheckList
          month={month}
          childId={childId}
          selectedMilestones={selectedMilestones}
          handleCheckboxChange={handleCheckboxChange}
        />
      </CheckContainer>
    </Wrapper>
  );
};

export default MileStoneCheck;
