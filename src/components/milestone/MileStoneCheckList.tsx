import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { getMilestone, MilestoneDetail } from '../../apis/milestone';
import CheckImg from '../../assets/images/milestone/check.png';
import theme from '../../styles/theme';
import Typhography from '../common/Typography';
import MileStoneAmount from './MileStoneAmount';

const CheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StyledInput = styled.input`
  appearance: none;
  width: 25px;
  height: 25px;
  border: 1.5px solid ${theme.color.tertiary[800]};
  border-radius: 50%;
  aspect-ratio: 1 / 1;

  &:checked {
    border-color: transparent;
    background-image: url(${CheckImg});
    background-size: 26px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${theme.color.tertiary[800]};
  }
`;

const StyledP = styled.p`
  margin: 10px 10px 12px;
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.color.greyScale[800]};
`;

const Line = styled.hr`
  border: none;
  margin: 0 40px;
  width: 90%;
  background-color: ${theme.color.tertiary[700]};
  height: 1px;
`;

interface MileStoneProps {
  month: number;
  childId: number;
  selectedMilestones: MilestoneDetail[];
  handleCheckboxChange: (item: MilestoneDetail, isChecked: boolean) => void;
}

const DevelopmentList = ({
  month,
  childId,
  selectedMilestones,
  handleCheckboxChange,
}: MileStoneProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['milestone', month],
    queryFn: () => getMilestone(childId, month),
  });

  if (error) {
    return <>데이터를 불러오지 못했습니다.</>;
  }
  if (isLoading) {
    return <div style={{ height: '800px' }}>로딩중</div>;
  }

  // 체크된 상태인지 확인하는 함수
  const isChecked = (milestone: MilestoneDetail) => {
    return selectedMilestones.some((selected) => selected.id === milestone.id);
  };

  return (
    <>
      {data?.data.map((stage) => (
        <React.Fragment key={stage.title}>
          {stage.milestones && (
            <CheckContainer>
              <Typhography size="lg" weight="bold" color="tertiary" shade="900">
                {stage.title}
              </Typhography>
              {stage.milestones.map((item: MilestoneDetail) => (
                <React.Fragment key={item.id}>
                  <StyledLabel>
                    <StyledInput
                      type="checkbox"
                      id={item.content}
                      checked={isChecked(item)}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                    />
                    <StyledP>{item.content}</StyledP>
                  </StyledLabel>
                  {item.currentAmount !== 0 && (
                    <MileStoneAmount
                      currentAmount={item.currentAmount}
                      requiredAmount={item.requiredAmount}
                    />
                  )}
                  <Line />
                </React.Fragment>
              ))}
            </CheckContainer>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default DevelopmentList;
