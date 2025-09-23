import dayjs from 'dayjs';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as s from './style';

import AppBar from '../../../components/common/AppBar';
import Button from '../../../components/common/Button';
import IconButton from '../../../components/common/IconButton';
import Textfield from '../../../components/common/Textfield';
import TimePicker from '../../../components/common/TimePicker';
import Schedule from '../../../components/Schedule';

import MicrophoneIcon from '@heroicons/react/16/solid/MicrophoneIcon';
import XMarkIcon from '@heroicons/react/16/solid/XMarkIcon';

import useAddSchedule from '../../../hooks/api/useAddSchedule';

import useChildStore from '../../../stores/useChlidStore';

import toISOString from '../../../utils/toISOString';
import useModal from '../../../hooks/useModal';
import { VoiceInputStatus } from '../../../components/Schedule/VoiceInput';

const AddSchedulePage = () => {
  const navigate = useNavigate();

  const { childId } = useChildStore();

  const modal = useModal();

  const dateRef = useRef<Date>(new Date());
  const timeRef = useRef<{ start: string; end: string }>({
    start: '00:00',
    end: '00:00',
  });

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<VoiceInputStatus>('done');

  const { mutate } = useAddSchedule();

  const isDisabled = title === '' || description === '';

  const handleDateClick = (date: Date) => {
    dateRef.current = date;
  };

  const handleTimeChange = (start: string, end: string) => {
    timeRef.current = { start, end };
  };

  const handleSubmit = (e: FormEvent) => {
    const date = dayjs(dateRef.current).format('YYYY-MM-DD');

    const start = `${date}T${timeRef.current.start}`,
      end = `${date}T${timeRef.current.end}`;

    mutate({
      childId,
      data: {
        title,
        description,
        startDateTime: toISOString(start),
        endDateTime: toISOString(end),
      },
    });

    e.preventDefault();
  };

  const handleStatusChange = (status: VoiceInputStatus) => {
    setStatus(status);

    if (status === 'done') {
      navigate(-1);
    }
  };

  const handleVoiceClick = (e: FormEvent) => {
    modal.push({
      children: <Schedule.VoiceInput onStatusChange={handleStatusChange} />,
    });
    e.preventDefault();
  };

  return (
    <s.Container>
      <AppBar>
        <div></div>
        <IconButton onClick={() => navigate(-1)}>
          <XMarkIcon />
        </IconButton>
        <AppBar.Title>일정 추가</AppBar.Title>
      </AppBar>
      <s.Main>
        <Schedule.Calendar onClick={handleDateClick} />
        <s.TimerPickerWrapper>
          <TimePicker
            start={timeRef.current.start}
            end={timeRef.current.end}
            onChange={handleTimeChange}
          />
        </s.TimerPickerWrapper>
        <s.Form onSubmit={handleSubmit}>
          <Textfield
            inputValue={title}
            setInputValue={setTitle}
            label="일정 이름"
            name="name"
            fullWidth
          />
          <Textfield
            inputValue={description}
            setInputValue={setDescription}
            label="일정 내용"
            name="description"
            fullWidth
          />
          <s.ButtonContainer>
            <Button
              color="secondary"
              disabled={status === 'pending'}
              onClick={handleVoiceClick}
            >
              <s.IconButton>
                {status === 'pending' ? (
                  <Schedule.Pending />
                ) : (
                  <s.Icon>
                    <MicrophoneIcon />
                  </s.Icon>
                )}
                음성으로 추가하기
              </s.IconButton>
            </Button>
            <Button disabled={isDisabled || status === 'pending'}>추가</Button>
          </s.ButtonContainer>
        </s.Form>
      </s.Main>
    </s.Container>
  );
};

export default AddSchedulePage;
