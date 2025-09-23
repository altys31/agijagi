import { useRef, useState } from 'react';

import * as s from './style';

import ClockIcon from '@heroicons/react/24/solid/ClockIcon';

import Button from '../../Button';

import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onSelect: (start: string, end: string) => void;
  start: string;
  end: string;
}

const Modal = ({ start, end, onSelect }: ModalProps) => {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState<boolean>(start > end);

  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const handleSaveClick = () => {
    const start = startRef.current?.value ?? '',
      end = endRef.current?.value ?? '';
    onSelect(start, end);

    navigate(-1);
  };

  const handleTimeChange = () => {
    const start = startRef.current?.value ?? '',
      end = endRef.current?.value ?? '';

    setIsDisabled(start === '' || end === '' || start > end);
  };

  return (
    <s.Container>
      <s.Icon>
        <ClockIcon />
      </s.Icon>
      <s.TimeContainer>
        <s.Time
          ref={startRef}
          type="time"
          onChange={handleTimeChange}
          defaultValue={start}
        />
        <s.Tilde>~</s.Tilde>
        <s.Time
          ref={endRef}
          type="time"
          onChange={handleTimeChange}
          defaultValue={end}
        />
      </s.TimeContainer>
      <s.ButtonContainer>
        <Button size="sm" disabled={isDisabled} onClick={handleSaveClick}>
          저장
        </Button>
        <Button size="sm" color="secondary" onClick={() => navigate(-1)}>
          닫기
        </Button>
      </s.ButtonContainer>
    </s.Container>
  );
};

export default Modal;
