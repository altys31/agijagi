import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '../../../common/Button';
import Typhography from '../../../common/Typography';
import { useState } from 'react';
import Textfield from '../../../common/Textfield';
import theme from '../../../../styles/theme';
import { BabyGender } from '../../../../types/user';

export const Container = styled.div<{ width: number; isNext: boolean }>(
  (props) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    width: 80%;
    height: 100%;
    gap: 6vh;
    z-index: 10;
    transition: all 1s;
    transform: translate(${props.isNext ? 0 : props.width * 1}px, 0);
  `
);

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const InputLabel = styled.div`
  position: absolute;
  font-size: 1rem;
  right: 12px;
  bottom: 12px;
  color: ${theme.color.greyScale[500]};
  z-index: 1;
`;

export const RadioForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export interface SecondBabyFormProps {
  isNext: boolean;
  selectedGender: BabyGender;
  setSelectedGender: React.Dispatch<React.SetStateAction<BabyGender>>;
  selectedRelation: Relationship;
  setSelectedRelation: React.Dispatch<React.SetStateAction<Relationship>>;
  weight: string;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  submitBaby: () => void;
}

export type Relationship = '엄마' | '아빠' | '기타';

export const SecondBabyForm = ({
  isNext,
  selectedGender,
  setSelectedGender,
  selectedRelation,
  setSelectedRelation,
  weight,
  setWeight,
  height,
  setHeight,
  submitBaby,
}: SecondBabyFormProps) => {
  const handleGenderClick = (gender: BabyGender) => {
    setSelectedGender(gender);
  };

  const handleRelationClick = (relationship: Relationship) => {
    setSelectedRelation(relationship);
  };

  return (
    <Container width={window.innerWidth} isNext={isNext}>
      <Typhography size="xl" weight="bold">
        추가 정보
      </Typhography>
      <RadioForm>
        <Typhography color="primary" size="xl" weight="bold">
          아기 성별
        </Typhography>
        <ButtonContainer>
          {['남아', '여아', '모름'].map((gender, _) => (
            <Button
              color={selectedGender === gender ? 'primary' : 'greyScale'}
              key={gender}
              onClick={() => {
                handleGenderClick(gender as BabyGender);
              }}
            >
              <Typhography
                color={selectedGender === gender ? 'white' : 'greyScale'}
                shade="200"
              >
                {gender}
              </Typhography>
            </Button>
          ))}
        </ButtonContainer>
      </RadioForm>
      <RadioForm>
        <Typhography color="primary" size="xl" weight="bold">
          아기와의 관계
        </Typhography>
        <ButtonContainer>
          {['엄마', '아빠', '기타'].map((relation, _) => (
            <Button
              color={selectedRelation === relation ? 'primary' : 'greyScale'}
              key={relation}
              onClick={() => {
                handleRelationClick(relation as Relationship);
              }}
            >
              <Typhography
                color={selectedRelation === relation ? 'white' : 'greyScale'}
                shade="200"
              >
                {relation}
              </Typhography>
            </Button>
          ))}
        </ButtonContainer>
      </RadioForm>
      <InputContainer>
        <InputLabel>kg</InputLabel>
        <Textfield
          label="몸무게"
          color="secondary"
          size="lg"
          isColoredLabel={true}
          inputValue={weight}
          setInputValue={setWeight}
          helpText="*선택사항"
          type="number"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>cm</InputLabel>
        <Textfield
          label="신장"
          size="lg"
          color="secondary"
          isColoredLabel={true}
          inputValue={height}
          setInputValue={setHeight}
          helpText="*선택사항"
          type="number"
        />
      </InputContainer>
      <Button
        fullWidth={true}
        disabled={!weight || !height}
        onClick={submitBaby}
      >
        등록
      </Button>
    </Container>
  );
};
