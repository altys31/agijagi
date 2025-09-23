import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import Button from '../common/Button';
import Typhography from '../common/Typography';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MilestoneDetail } from '../../apis/milestone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReport } from '../../apis/report';
import useModal from '../../hooks/useModal';
import { deleteStoryBook, StoryBookDetail } from '../../apis/book';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-color: ${theme.color.tertiary[50]};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 95%;
`;

const CloseButton = styled(XMarkIcon)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: ${theme.color.greyScale[800]};
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px auto;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 65%;
  margin: 15px auto;
  justify-content: space-between;
`;

interface ModalProps {
  storyId: number | undefined;
  onBookSelect: (book: StoryBookDetail | null) => void;
  childId: number;
}

const BookDeleteModal = ({ storyId, onBookSelect, childId }: ModalProps) => {
  const { pop } = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteStoryBook,
    onSuccess: () => {
      pop();
      onBookSelect(null);
      navigate('/book');
      queryClient.invalidateQueries({
        queryKey: ['storybooklist', childId],
        exact: true, // 이 옵션은 해당 쿼리 키와 정확히 일치하는 쿼리를 무효화함
      });
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const deleteBook = async () => {
    mutate({ storyId });
  };

  return (
    <ModalContainer>
      <HeaderWrapper>
        <CloseButton onClick={handleBack} />
      </HeaderWrapper>

      <TextWrapper>
        <Typhography size="lg" color="greyScale" shade="800">
          동화를 삭제하겠습니까?
        </Typhography>
      </TextWrapper>

      <ButtonWrapper>
        <Button
          size="md"
          color="danger"
          onClick={deleteBook}
          disabled={isPending}
        >
          삭제
        </Button>

        <Button size="md" color="greyScale" onClick={handleBack}>
          취소
        </Button>
      </ButtonWrapper>
    </ModalContainer>
  );
};

export default BookDeleteModal;
