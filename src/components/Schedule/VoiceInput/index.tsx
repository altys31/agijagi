import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as s from './style';

import RecordButton from '../RecordButton';

import useUserAudio from '../../../hooks/useUserAudio';
import useDialog from '../../../hooks/useDialog';
import useAddScheduleByVoice from '../../../hooks/api/useAddScheduleByVoice';

import useChildStore from '../../../stores/useChlidStore';

export type VoiceInputStatus = 'pending' | 'done';

interface VoiceInputProps {
  onStatusChange: (status: VoiceInputStatus) => void;
}

const VoiceInput = ({ onStatusChange }: VoiceInputProps) => {
  const navigate = useNavigate();

  const { childId } = useChildStore();

  const { record, stop } = useUserAudio();

  const { alert } = useDialog();

  const { mutateAsync } = useAddScheduleByVoice();

  const handleClick = () => {
    onStatusChange('pending');

    stop()
      .then(async (result) => {
        await mutateAsync({
          childId,
          name: 'voice',
          extension: 'webm',
          base64Data: result.toString().split('base64,')[1],
        });
        onStatusChange('done');
      })
      .catch(async () => {
        await alert('오류로 인해 녹음하지 못했습니다.');
        onStatusChange('done');
      });
  };

  useEffect(() => {
    record();
  }, []);

  return (
    <s.Container onClick={() => navigate(-1)}>
      <RecordButton onClick={handleClick} />
    </s.Container>
  );
};

export default VoiceInput;
