import useAddLatestRecords from '../../../hooks/api/useAddLatestRecords';
import useRecordTimer from '../../../hooks/useRecordTimer';
import useTimeDifference from '../../../hooks/useTimeDifference';
import useChildStore from '../../../stores/useChlidStore';

import { RecordMenu } from '../../../types/record';

import now from '../../../utils/now';

import Typhography from '../../common/Typography';

import * as s from './RecordButton.style';

interface RecordButtonProps extends RecordMenu {
  toggle?: boolean;
}

const RecordButton = ({
  icon,
  color,
  type,
  latestDateTime,
  toggle = false,
}: RecordButtonProps) => {
  const { isActive, start, stop, getTimer, getStart } = useRecordTimer(type);

  const timeDifference = useTimeDifference(latestDateTime || '');

  const { childId } = useChildStore();

  const { mutate } = useAddLatestRecords();

  const handleClick = () => {
    if (!toggle) {
      mutate({
        childId,
        data: {
          startDateTime: now(),
          endDateTime: null,
          type,
        },
      });
      return;
    }

    if (isActive()) {
      mutate({
        childId,
        data: {
          startDateTime: getStart() || '',
          endDateTime: now(),
          type,
        },
      });
      stop();
    } else {
      start();
    }
  };

  return (
    <s.RecordButton
      color={color}
      onClick={handleClick}
      active={toggle && isActive()}
    >
      <s.Icon src={icon} alt="Icon" />
      <Typhography color="white" size="sm">
        {type}
        {isActive() && ' 중'}
      </Typhography>
      <Typhography color="white" size="md">
        {isActive()
          ? getTimer()
          : latestDateTime === null
          ? '기록 없음'
          : timeDifference}
      </Typhography>
    </s.RecordButton>
  );
};

export default RecordButton;
