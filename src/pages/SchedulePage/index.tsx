import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import AppBar from '../../components/common/AppBar';
import Button from '../../components/common/Button';
import Typhography from '../../components/common/Typography';
import Schedule from '../../components/Schedule';
import IconButton from '../../components/common/IconButton';

import XMarkIcon from '@heroicons/react/16/solid/XMarkIcon';

import useModal from '../../hooks/useModal';

import AddSchedulePage from './AddSchedulePage';

import * as s from './style';

const SchedulePage = () => {
  const [date, setDate] = useState<Date>(new Date());

  const navigate = useNavigate();

  const modal = useModal();

  const days = ['일', '월', '화', '수', '목', '금', '토', '일'];

  const handleAddClick = () => {
    modal.push({ children: <AddSchedulePage /> });
  };

  const handleDateClick = (date: Date) => {
    setDate(date);
  };

  return (
    <s.Container>
      <AppBar>
        <div></div>
        <IconButton onClick={() => navigate(-1)}>
          <XMarkIcon />
        </IconButton>
        <AppBar.Title>일정 관리</AppBar.Title>
      </AppBar>
      <s.Main>
        <div>
          <Schedule.Calendar onClick={handleDateClick} />
        </div>
        <s.ScheduleHeader>
          <Typhography size="lg" color="secondary" weight="bold">
            {date.getMonth() + 1}월 {date.getDate()}일 ({days[date.getDay()]})
            일정
          </Typhography>
          <Button size="sm" onClick={handleAddClick}>
            추가
          </Button>
        </s.ScheduleHeader>
        <s.ScheduleList>
          <Schedule.List
            start={dayjs(date).format('YYYY-MM-DD')}
            end={dayjs(date).format('YYYY-MM-DD')}
          />
        </s.ScheduleList>
      </s.Main>
    </s.Container>
  );
};

export default SchedulePage;
