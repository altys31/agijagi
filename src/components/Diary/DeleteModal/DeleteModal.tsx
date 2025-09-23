import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useModal from '../../../hooks/useModal';
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
export interface DeleteDiaryProps {
  handleDeleteDiary: () => void;
}
export const DeleteDiary = ({ handleDeleteDiary }: DeleteDiaryProps) => {
  const navigator = useNavigate();
  const modal = useModal();

  return (
    <ModalBackground>
      <Typhography size="md" color="danger" shade="500" weight="bold">
        정말로 일기를 삭제하시겠어요?
      </Typhography>
      <ButtonContainer>
        <Button color="danger" onClick={handleDeleteDiary}>
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
