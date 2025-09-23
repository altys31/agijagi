import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import AppBar from '../../../components/common/AppBar';
import IconButton from '../../../components/common/IconButton';
import Schedule from '../../../components/Schedule';
import Textfield from '../../../components/common/Textfield';
import Button from '../../../components/common/Button';
import TimePicker from '../../../components/common/TimePicker';

import XMarkIcon from '@heroicons/react/16/solid/XMarkIcon';

import * as s from './style';

import useDialog from '../../../hooks/useDialog';
import useDeleteSchedule from '../../../hooks/api/useDeleteSchedule';
import useEditSchedule from '../../../hooks/api/useEditSchedule';

import useChildStore from '../../../stores/useChlidStore';

import type { ScheduleResponse } from '../../../types/schedule';

const EditSchedulePage = ({ id: scheduleId, ...props }: ScheduleResponse) => {
  const { childId } = useChildStore();

  const { confirm } = useDialog();

  const navigate = useNavigate();

  const deleteSchedule = useDeleteSchedule();
  const editSchedule = useEditSchedule();

  const [title, setTitle] = useState<string>(props.title);
  const [description, setDescription] = useState<string>(props.description);

  const isDisabled = title === '' || description === '';

  const dateRef = useRef<Date>();
  const timeRef = useRef<{ start: string; end: string }>({
    start: dayjs(props.startDateTime).format('HH:mm'),
    end: dayjs(props.endDateTime).format('HH:mm'),
  });

  const handleDateClick = (date: Date) => {
    dateRef.current = date;
  };

  const handleTimeChange = (start: string, end: string) => {
    timeRef.current = { start, end };
  };

  const handleDeleteClick = async () => {
    if (!(await confirm('정말로 일정을 삭제할까요?'))) {
      return;
    }

    deleteSchedule.mutate({ childId, scheduleId });
  };

  const handleEditClick = async () => {
    const date = dayjs(dateRef.current).format('YYYY-MM-DD');

    const start = `${date}T${timeRef.current.start}`,
      end = `${date}T${timeRef.current.end}`;

    editSchedule.mutate({
      childId,
      scheduleId,
      data: {
        title,
        description,
        startDateTime: start,
        endDateTime: end,
      },
    });
  };

  return (
    <s.Container>
      <AppBar>
        <div></div>
        <IconButton onClick={() => navigate(-1)}>
          <XMarkIcon />
        </IconButton>
        <AppBar.Title>일정 수정</AppBar.Title>
      </AppBar>
      <s.Main>
        <Schedule.Calendar
          date={new Date(props.startDateTime)}
          onClick={handleDateClick}
        />
        <s.TimerPickerWrapper>
          <TimePicker
            start={timeRef.current.start}
            end={timeRef.current.end}
            onChange={handleTimeChange}
          />
        </s.TimerPickerWrapper>
        <s.Form>
          <Textfield
            inputValue={title}
            setInputValue={setTitle}
            label="일정 이름"
            fullWidth
          />
          <Textfield
            inputValue={description}
            setInputValue={setDescription}
            label="일정 내용"
            fullWidth
          />
          <s.ButtonContainer>
            <Button
              color="danger"
              onClick={handleDeleteClick}
              disabled={deleteSchedule.isPending}
            >
              삭제
            </Button>
            <Button
              color="success"
              onClick={handleEditClick}
              disabled={editSchedule.isPending || isDisabled}
            >
              수정
            </Button>
          </s.ButtonContainer>
        </s.Form>
      </s.Main>
    </s.Container>
  );
};

export default EditSchedulePage;
