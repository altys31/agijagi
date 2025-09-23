import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Typhography from '../../components/common/Typography';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 10px;
  color: ${theme.color.greyScale[700]};
`;

const ArrowButton = styled.div`
  width: 22px;
  cursor: pointer;
`;

interface DateNavigationProps {
  year: number;
  month: number;
  handlePrev: () => void;
  handleNext: () => void;
}

const BookFilter = ({
  year,
  month,
  handlePrev,
  handleNext,
}: DateNavigationProps) => {
  return (
    <Container>
      <ArrowButton onClick={handlePrev}>
        <ChevronLeftIcon />
      </ArrowButton>
      <Typhography size="md" weight="bold" shade="800" color="greyScale">
        {`${year}년 ${month}월`}
      </Typhography>
      <ArrowButton onClick={handleNext}>
        <ChevronRightIcon />
      </ArrowButton>
    </Container>
  );
};

export default BookFilter;
