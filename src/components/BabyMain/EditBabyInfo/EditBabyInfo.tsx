import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editChildInfo } from '../../../apis/childApi';
import { editUserInfo } from '../../../apis/userApi';
import useModal from '../../../hooks/useModal';
import theme from '../../../styles/theme';
import { BabyGender, BabyResponse, MemberResponse } from '../../../types/user';
import Button from '../../common/Button';
import Textfield from '../../common/Textfield';
import { ValidationState } from '../../common/Textfield/Textfield.types';
import Typhography from '../../common/Typography';
import axios from 'axios';

export const ModalBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: auto;
  gap: 2.5rem;
  background-color: ${theme.color.primary[50]};
  padding: 2rem;
  border-radius: 0.5rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const DateInputContainer = styled.div`
  position: relative;
`;

export const DateInputLabel = styled.div`
  position: absolute;
  font-size: 0.75rem;
  left: 12px;
  bottom: 26px;
  color: ${theme.color.primary[900]};
  z-index: 1;
`;
export const RadioForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.6rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export interface EditBabyProps {
  child?: BabyResponse;
}

export const EditBabyInfo = ({ child }: EditBabyProps) => {
  const [name, setName] = useState<string>(child ? child.name : '');
  const [nickname, setNickname] = useState<string>(child ? child.nickname : '');
  const [birthday, setBirthday] = useState<string>(child ? child.birthday : '');
  const [selectedGender, setSelectedGender] = useState<BabyGender>(
    child ? child.gender : '모름'
  );
  const [isValidated, setIsValidated] = useState<Record<string, boolean>>({
    name: true,
    nickname: true,
  });

  const modal = useModal();
  const navigator = useNavigate();

  const handleGenderClick = (gender: BabyGender) => {
    setSelectedGender(gender);
  };

  const submitEditBaby = () => {
    if (child?.childId) {
      const request = {
        childId: child?.childId,
        name: name,
        nickname: nickname,
        gender: selectedGender,
        birthday: birthday,
      };

      editChildInfo(request)
        .then((response) => {
          modal.pop();
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            alert(error.response?.data.message);
          }
        });
    }
  };

  function validateName(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    if (input.length >= 2 && input.length <= 8) {
      setIsValidated({ ...isValidated, name: true });
      return 'success';
    } else {
      setIsValidated({ ...isValidated, name: false });
      return 'danger';
    }
  }

  function validateNickname(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    if (input.length >= 2 && input.length <= 8) {
      setIsValidated({ ...isValidated, nickname: true });
      return 'success';
    } else {
      setIsValidated({ ...isValidated, nickname: false });
      return 'danger';
    }
  }

  return (
    <ModalBackground>
      <TitleWrapper>
        <Typhography size="6xl" weight="bold">
          정보 수정
        </Typhography>
      </TitleWrapper>
      <DateInputContainer>
        <DateInputLabel>
          <Typhography size="2xs" weight="bold">
            이름
          </Typhography>
        </DateInputLabel>
        <Textfield
          label=""
          size="md"
          isColoredLabel={true}
          fullWidth={true}
          inputValue={name}
          setInputValue={setName}
          validationFunction={validateName}
          helpText={'이름은 2~8자의 규칙을 만족해야해요'}
          checkText={'올바르게 입력했어요'}
          warningText={'이름 형식이 일치하지 않아요'}
        />
      </DateInputContainer>
      <DateInputContainer>
        <DateInputLabel>
          <Typhography size="2xs" weight="bold">
            닉네임
          </Typhography>
        </DateInputLabel>
        <Textfield
          label=""
          size="md"
          isColoredLabel={true}
          fullWidth={true}
          inputValue={nickname}
          setInputValue={setNickname}
          validationFunction={validateNickname}
          helpText={'닉네임은 2~8자의 규칙을 만족해야해요'}
          checkText={'올바르게 입력했어요'}
          warningText={'닉네임 형식이 일치하지 않아요'}
        />
      </DateInputContainer>
      <DateInputContainer>
        <DateInputLabel>
          <Typhography size="2xs" weight="bold">
            생년월일 / 출생예정일
          </Typhography>
        </DateInputLabel>
        <Textfield
          label=""
          size="md"
          color="tertiary"
          isColoredLabel={true}
          inputValue={birthday}
          setInputValue={setBirthday}
          type="date"
        />
      </DateInputContainer>
      <RadioForm>
        <Typhography color="primary" size="md" weight="bold">
          성별
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

      <ButtonWrapper>
        <Button
          size="sm"
          disabled={!isValidated.name || !isValidated.nickname}
          onClick={submitEditBaby}
        >
          수정하기
        </Button>
        <Button
          size="sm"
          color="danger"
          onClick={() => {
            modal.pop();
          }}
        >
          닫기
        </Button>
      </ButtonWrapper>
    </ModalBackground>
  );
};
