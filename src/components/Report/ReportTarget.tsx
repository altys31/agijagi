import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { FaceSmileIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Typhography from '../common/Typography';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 650px;
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 170px;
  height: 30px;
  align-items: center;
  padding: 3px 10px;
  background-color: ${theme.color.primary[50]};
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid ${theme.color.primary[700]};
`;

const DateIcon = styled(CalendarIcon)`
  width: 21px;
  margin-right: 5px;
  color: ${theme.color.primary[800]};
`;

const GenderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 30px;
  align-items: center;
  padding: 3px 10px;
  background-color: ${theme.color.primary[50]};
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid ${theme.color.primary[700]};
`;

const FaceIcon = styled(FaceSmileIcon)`
  width: 25px;
  margin-right: 5px;
  color: ${theme.color.primary[800]};
`;

interface FilterProps {
  gender: string | undefined;
  createDate: string | undefined;
}

const ReportFilter = ({ gender, createDate }: FilterProps) => {

  return (
    <Container>
      <DateContainer>
        <DateIcon />
        <Typhography size="sm" color="greyScale" shade="800">
          생성일 : {createDate}
        </Typhography>
      </DateContainer>

      <GenderContainer>
        <FaceIcon />
        <Typhography size="sm" color="greyScale" shade="800">
          {gender}
        </Typhography>
      </GenderContainer>
    </Container>
  );
};

export default ReportFilter;
