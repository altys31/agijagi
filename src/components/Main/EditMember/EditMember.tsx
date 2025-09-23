import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editUserInfo } from '../../../apis/userApi';
import useModal from '../../../hooks/useModal';
import theme from '../../../styles/theme';
import { MemberResponse } from '../../../types/user';
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
  gap: 3rem;
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
  bottom: 32px;
  color: ${theme.color.primary[900]};
  z-index: 1;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export interface EditMemberProps {
  member: MemberResponse;
  handleRender: () => void;
}

export const EditMember = ({ member, handleRender }: EditMemberProps) => {
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>(member.nickname);
  const [isValidated, setIsValidated] = useState<Record<string, boolean>>({
    password: false,
    nickname: true,
  });

  const navigator = useNavigate();
  const modal = useModal();

  const submitEditMember = () => {
    const editMemberInfo = {
      email: member.email,
      password: password,
      nickname: nickname,
    };
    editUserInfo(editMemberInfo)
      .then((response) => {
        modal.pop();
        handleRender();
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      });
  };

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

  function validatePassword(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    if (input.length >= 8 && input.length <= 16) {
      setIsValidated({ ...isValidated, password: true });
      return 'success';
    } else {
      setIsValidated({ ...isValidated, password: false });
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
          <Typhography size="xs" weight="bold">
            닉네임
          </Typhography>
        </DateInputLabel>
        <Textfield
          label=""
          size="lg"
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
          <Typhography size="xs" weight="bold">
            비밀번호
          </Typhography>
        </DateInputLabel>
        <Textfield
          size="lg"
          label=""
          isColoredLabel={false}
          fullWidth={true}
          inputValue={password}
          setInputValue={setPassword}
          helpText={'* 8~16자의 영소문자와 숫자로 이루어져야 해요.'}
          checkText={'올바르게 입력했어요'}
          warningText={'비밀번호 형식이 일치하지 않아요'}
          validationFunction={validatePassword}
          type="password"
        ></Textfield>
      </DateInputContainer>

      <ButtonWrapper>
        <Button
          size="sm"
          disabled={!isValidated.password || !isValidated.nickname}
          onClick={submitEditMember}
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
