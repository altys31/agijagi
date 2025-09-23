import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../apis/authApi';
import useModal from '../../../hooks/useModal';
import useMemberStore from '../../../stores/useMemberStore';
import theme from '../../../styles/theme';
import Button from '../../common/Button';
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
export const LogoutModal = () => {
  const navigator = useNavigate();
  const modal = useModal();
  const { updateMemberId } = useMemberStore();

  const handleLogout = () => {
    logout().then((response) => {
      updateMemberId(0);

      modal.pop();
      window.location.href = '/login';
    });
  };

  return (
    <ModalBackground>
      <Typhography size="2xl" weight="bold">
        로그아웃 할까요?
      </Typhography>
      <ButtonContainer>
        <Button color="danger" onClick={handleLogout}>
          로그아웃
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
