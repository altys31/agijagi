import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Typhography from '../../components/common/Typography';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 650px;
  width: 100%;
  color: ${theme.color.greyScale[800]};
`;

const ArrowButton = styled.div`
  width: 22px;
  cursor: pointer;
`;

interface DateNavigationProps {
  month: number;
  handlePrev: () => void;
  handleNext: () => void;
}

const MileStoneFilter = ({
  month,
  handlePrev,
  handleNext,
}: DateNavigationProps) => {
  return (
    <Container>
      <ArrowButton onClick={handlePrev}>
        <ChevronLeftIcon />
      </ArrowButton>
      <Typhography size="md" weight="bold" shade="900" color="tertiary">
        {`${month}개월`}
      </Typhography>
      <ArrowButton onClick={handleNext}>
        <ChevronRightIcon />
      </ArrowButton>
    </Container>
  );
};

export default MileStoneFilter;
