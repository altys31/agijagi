import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import Button from '../common/Button';
import Typhography from '../common/Typography';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Loading from './ReportLoading';
import { MilestoneDetail } from '../../apis/milestone';
import { useMutation } from '@tanstack/react-query';
import { postReport } from '../../apis/report';
import useModal from '../../hooks/useModal';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-color: ${theme.color.tertiary[50]};
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 500px;
  border-radius: 10px;
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
  selectedMilestones: MilestoneDetail[];
  currentWeight: string;
  currentHeight: string;
  handleWeightHeighSave: () => void;
  handleMileStoneSave: () => void;
  childId: number;
}

const ReportModal = ({
  selectedMilestones,
  currentHeight,
  currentWeight,
  handleWeightHeighSave,
  handleMileStoneSave,
  childId,
}: ModalProps) => {
  const { pop } = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: postReport,
    onSuccess: (data) => {
      pop();
      setTimeout(() => {
        navigate('/milestone-report', { state: { reportId: data.data.id } });
      }, 300);
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const createReport = async () => {
    setIsLoading(true);

    setTimeout(() => {
      if (selectedMilestones.length) {
        handleMileStoneSave();
      }
      if (currentHeight && currentWeight) {
        handleWeightHeighSave();
      }
      // 1.8초 후 보고서 생성 API 호출 (post)
      mutate(childId);
    }, 1800);
  };

  return (
    <ModalContainer>
      {isLoading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        <>
          <HeaderWrapper>
            <CloseButton onClick={handleBack} />
          </HeaderWrapper>

          <TextWrapper>
            {selectedMilestones.length || (currentHeight && currentWeight) ? (
              <Typhography size="lg" color="greyScale" shade="800">
                마일스톤을 저장하고 <br /> 분석 보고서를 생성하시겠습니까?
              </Typhography>
            ) : (
              <Typhography size="lg" color="greyScale" shade="800">
                성장 분석 보고서를 <br /> 생성하시겠습니까?
              </Typhography>
            )}
          </TextWrapper>

          <ButtonWrapper>
            {selectedMilestones.length || (currentHeight && currentWeight) ? (
              <Button
                size="md"
                color="secondary"
                onClick={createReport}
                disabled={isPending}
              >
                저장 후 생성
              </Button>
            ) : (
              <Button
                size="md"
                color="secondary"
                onClick={createReport}
                disabled={isPending}
              >
                생성
              </Button>
            )}

            <Button size="md" color="greyScale" onClick={handleBack}>
              취소
            </Button>
          </ButtonWrapper>
        </>
      )}
    </ModalContainer>
  );
};

export default ReportModal;
