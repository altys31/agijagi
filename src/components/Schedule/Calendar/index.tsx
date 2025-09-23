import { useState } from 'react';

import * as s from './style';

import CompactCalendar from '../../common/CompactCalendar';
import Typhography from '../../common/Typography';
import useGetSchedules from '../../../hooks/api/useGetSchedules';
import useChildStore from '../../../stores/useChlidStore';

import dayjs from 'dayjs';

interface CalendarProps {
  date?: Date;
  onClick: (date: Date) => void;
}

const Calendar = ({ date = new Date(), onClick }: CalendarProps) => {
  const { childId } = useChildStore();

  const [calendar, setCalendar] = useState<Date>(new Date());

  const start = dayjs(calendar).startOf('week').format('YYYY-MM-DD'),
    end = dayjs(calendar).endOf('week').format('YYYY-MM-DD');

  const data = useGetSchedules(childId, start, end);

  const highlight = new Set(
    data.map((data) => dayjs(data.startDateTime).format('YYYY-MM-DD'))
  );

  const handleChange = (date: Date) => {
    setCalendar(date);
  };

  return (
    <s.Container>
      <Typhography size="lg" color="secondary" weight="bold">
        {calendar.getFullYear()}년 {calendar.getMonth() + 1}월
      </Typhography>
      <CompactCalendar
        date={date}
        highlight={highlight}
        onChange={handleChange}
        onClick={onClick}
      />
    </s.Container>
  );
};

export default Calendar;
