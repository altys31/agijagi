import { useState } from 'react';

import * as s from './style';

import ClockIcon from '@heroicons/react/24/solid/ClockIcon';

import Typhography from '../Typography';
import TimePickerModal from './Modal';

import useModal from '../../../hooks/useModal';

interface TimePickerProps {
  start?: string;
  end?: string;
  onChange: (start: string, end: string) => void;
}

const TimePicker = ({
  start: initStart = '00:00',
  end: initEnd = '00:00',
  onChange,
}: TimePickerProps) => {
  const modal = useModal();

  const [start, setStart] = useState<string>(initStart);
  const [end, setEnd] = useState<string>(initEnd);

  const handleTimeSelect = (start: string, end: string) => {
    setStart(start);
    setEnd(end);
    onChange(start, end);
  };

  const handleClick = () => {
    modal.push({
      children: (
        <TimePickerModal start={start} end={end} onSelect={handleTimeSelect} />
      ),
    });
  };

  return (
    <s.Container onClick={handleClick}>
      <s.Icon>
        <ClockIcon />
      </s.Icon>
      <Typhography size="sm" weight="bold">
        {start} ~ {end}
      </Typhography>
    </s.Container>
  );
};

export default TimePicker;
