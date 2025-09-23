import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import StopIcon from '@heroicons/react/24/solid/StopIcon';

import * as s from './style';

interface RecordButtonProps {
  onClick: () => void;
}

/**
 * 문장 읽기 페이지에서 사용할 음성 녹음 버튼
 */
const RecordButton = ({ onClick }: RecordButtonProps) => {
  return (
    <s.Container onClick={onClick}>
      <StopIcon />
    </s.Container>
  );
};

export default RecordButton;
