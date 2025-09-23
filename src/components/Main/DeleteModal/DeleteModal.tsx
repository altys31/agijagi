import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../apis/authApi';
import { deleteUser } from '../../../apis/userApi';
import useModal from '../../../hooks/useModal';
import theme from '../../../styles/theme';
import Button from '../../common/Button';
import Textfield from '../../common/Textfield';
import Typhography from '../../common/Typography';

export const ModalBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75vw;
  background-color: ${theme.color.primary[50]};
  margin: 1rem;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 0.5rem;
  gap: 2rem;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
export const DeleteMemberModal = () => {
  const [input, setInput] = useState<string>('');
  const navigator = useNavigate();
  const modal = useModal();

  const handleDelete = () => {
    deleteUser()
      .then((response) => {
        localStorage.removeItem('memberId');
        modal.pop();
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ModalBackground>
      <Typhography size="xl" weight="regular">
        탈퇴를 위해 회원탈퇴를 입력해주세요
      </Typhography>
      <Textfield
        label="회원탈퇴"
        color="greyScale"
        inputValue={input}
        setInputValue={setInput}
      />
      <ButtonContainer>
        <Button
          color="danger"
          onClick={handleDelete}
          disabled={input !== '회원탈퇴'}
        >
          탈퇴
        </Button>
        <Button
          onClick={() => {
            modal.pop();
          }}
        >
          아니오
        </Button>
      </ButtonContainer>
    </ModalBackground>
  );
};
