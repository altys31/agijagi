import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../apis/authApi';
import { deleteChild } from '../../../apis/childApi';
import useModal from '../../../hooks/useModal';
import useChildStore from '../../../stores/useChlidStore';
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
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
export const DeleteBaby = () => {
  const navigator = useNavigate();
  const modal = useModal();
  const { childId } = useChildStore();

  const handleLogout = () => {
    const request = {
      childId: childId,
    };
    deleteChild(request).then((response) => {
      modal.pop();
      alert('삭제되었습니다');
      window.location.href = '/main';
    });
  };

  return (
    <ModalBackground>
      <Typhography size="md" color="danger" shade="500" weight="bold">
        정말로 패밀리를 삭제하시겠어요?
      </Typhography>
      <ButtonContainer>
        <Button color="danger" onClick={handleLogout}>
          삭제
        </Button>
        <Button
          onClick={() => {
            modal.pop();
          }}
        >
          취소
        </Button>
      </ButtonContainer>
    </ModalBackground>
  );
};
