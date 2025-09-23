import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import Button from '../common/Button';
import Textfield from '../common/Textfield';
import {
  getHeightWeightInfo,
  MilestoneDetail,
  putHeightWeight,
} from '../../apis/milestone';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ValidationState } from '../common/Textfield/Textfield.types';
import useModal from '../../hooks/useModal';
import ReportModal from '../Report/ReportCreateModal';

const ButtonWrapper = styled.div<{ visible: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.visible ? 'space-between' : 'space-around'};
  padding: 10px;

  @media (min-width: 600px) {
    width: 95%;
    margin: 0 auto;
  }
`;

const ReportButton = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const InputButton = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const TextFieldContainer = styled.div<{ expanded: boolean; visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: ${(props) => (props.visible ? 'flex-end' : 'center')};
  width: 100%;
  margin: 5px auto;
  max-height: ${(props) => (props.expanded ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease;

  @media (min-width: 700px) {
    width: 90%;
    margin-right: 20px;
  }
`;

const TextFieldWrapper = styled.div`
  display: flex;
  margin: 0px 10px 10px;
  flex-direction: column;
  gap: 5px;
`;

const PrevDataText = styled.p`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.color.secondary[700]};
  margin: 5px 0 0 10px;
`;

const SaveButton = styled.div<{ visible: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.visible ? 'flex-end' : 'center')};
  margin-top: 20px;
`;

const WarningMessage = styled.div`
  position: fixed;
  text-align: center;
  width: 230px;
  bottom: 220px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.color.danger[500]};
  color: white;
  padding: 15px;
  border-radius: 10px;
  z-index: 1000;
  font-size: ${theme.typography.fontSize.md};
`;

const SuccessMessage = styled.div`
  position: fixed;
  text-align: center;
  width: 230px;
  bottom: 220px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.color.success[500]};
  color: white;
  padding: 15px;
  border-radius: 10px;
  z-index: 1000;
  font-size: ${theme.typography.fontSize.md};
`;

interface MileStoneButtnProps {
  weight: number | null | undefined;
  month: number;
  babyMonth: number;
  childId: number;
  selectedMilestones: MilestoneDetail[];
  handleMileStoneSave: () => void;
}

const MileStoneButton = ({
  weight,
  month,
  babyMonth,
  childId,
  selectedMilestones,
  handleMileStoneSave,
}: MileStoneButtnProps) => {
  const [textFieldOpen, setTextFieldOpen] = useState<boolean>(false);
  const [currentHeight, setCurrentHeight] = useState<string>('');
  const [currentWeight, setCurrentWeight] = useState<string>('');
  const [saveHeight, setSaveHeight] = useState<number>(0);
  const [saveWeight, setSaveWeight] = useState<number>(0);
  const [success, setSuccess] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const modal = useModal();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: putHeightWeight,
    onSuccess: () => {
      setSuccess('키와 몸무게를 저장했습니다');
      setTimeout(() => setSuccess(''), 2000);
      queryClient.invalidateQueries({
        queryKey: ['child', childId, 'weight'],
        exact: true, // 이 옵션은 해당 쿼리 키와 정확히 일치하는 쿼리를 무효화함
      });
    },
  });

  const weightQuery = useQuery({
    queryKey: ['child', childId, 'weight'],
    queryFn: () => getHeightWeightInfo(childId),
  });

  const filteredHeightWeightData = weightQuery.data?.data.filter((data) => {
    return data.month === month;
  });

  useEffect(() => {
    setCurrentHeight('');
    setCurrentWeight('');
    setTextFieldOpen(false);
    if (filteredHeightWeightData && filteredHeightWeightData?.length !== 0) {
      setSaveHeight(filteredHeightWeightData[0].height);
      setSaveWeight(filteredHeightWeightData[0].weight);
    }
  }, [month, weightQuery.data?.data]);

  const handleTextFieldOpen = () => {
    setTextFieldOpen(!textFieldOpen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReportModalOpen = () => {
    if (!weight) {
      setWarning('출생 몸무게를 먼저 등록해주세요');
      setTimeout(() => setWarning(''), 2000);
    } else {
      modal.push({
        children: (
          <ReportModal
            selectedMilestones={selectedMilestones}
            currentHeight={currentHeight}
            currentWeight={currentWeight}
            handleWeightHeighSave={handleWeightHeighSave}
            handleMileStoneSave={handleMileStoneSave}
            childId={childId}
          />
        ),
      });
    }
  };

  const handleWeightHeighSave = () => {
    // 입력이 없으면 경고 메세지
    if (!currentHeight || !currentWeight) {
      setWarning('키와 몸무게를 모두 입력해주세요');
      setTimeout(() => setWarning(''), 2000);
      return;
    }
    // 키 / 몸무게 저장 API 호출 (put)
    mutate({
      childId,
      data: {
        height: parseFloat(currentHeight),
        weight: parseFloat(currentWeight),
        month: month,
      },
    });

    setSaveHeight(parseFloat(currentHeight));
    setSaveWeight(parseFloat(currentWeight));

    setCurrentHeight('');
    setCurrentWeight('');
  };

  function validateInput(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }
    if (!isNaN(Number(input))) {
      return 'success';
    }
    return 'danger';
  }

  return (
    <>
      <ButtonWrapper visible={babyMonth === month}>
        <ReportButton visible={babyMonth === month}>
          <Button size="sm" color="secondary" onClick={handleReportModalOpen}>
            성장 분석보고서 생성
          </Button>
        </ReportButton>
        <InputButton visible={babyMonth >= month}>
          <Button size="sm" color="primary" onClick={handleTextFieldOpen}>
            키/몸무게 입력
          </Button>
        </InputButton>
      </ButtonWrapper>

      {textFieldOpen && (
        <TextFieldContainer
          expanded={textFieldOpen}
          visible={babyMonth === month}
        >
          <TextFieldWrapper>
            {filteredHeightWeightData?.length !== 0 && (
              <PrevDataText>
                최근 저장된 키 데이터 : {saveHeight}
                cm
              </PrevDataText>
            )}

            <Textfield
              label="키 cm"
              size="md"
              color="tertiary"
              isColoredLabel={true}
              inputValue={currentHeight}
              setInputValue={setCurrentHeight}
              validationFunction={validateInput}
              helpText={'*숫자만 입력해주세요'}
              checkText={'올바르게 입력했습니다. 저장해주세요'}
              warningText={'숫자만 입력해주세요'}
            />
          </TextFieldWrapper>
          <TextFieldWrapper>
            {filteredHeightWeightData?.length !== 0 && (
              <PrevDataText>
                최근 저장된 몸무게 데이터 : {saveWeight}
                kg
              </PrevDataText>
            )}

            <Textfield
              label="몸무게 kg"
              size="md"
              color="tertiary"
              isColoredLabel={true}
              inputValue={currentWeight}
              setInputValue={setCurrentWeight}
              validationFunction={validateInput}
              helpText={'*숫자만 입력해주세요'}
              checkText={'올바르게 입력했습니다. 저장해주세요'}
              warningText={'숫자만 입력해주세요'}
            />
            <SaveButton visible={babyMonth === month}>
              <Button
                size="sm"
                color="primary"
                onClick={handleWeightHeighSave}
                disabled={isPending}
              >
                키/몸무게 저장
              </Button>
            </SaveButton>
          </TextFieldWrapper>
        </TextFieldContainer>
      )}

      {warning && <WarningMessage>{warning}</WarningMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </>
  );
};

export default MileStoneButton;
