import dayjs from 'dayjs';

import Typhography from '../../Typography';

import * as s from './Week.style';

interface WeekProps {
  date: Date;
  selected: Date;
  highlight?: Set<string>;
  onClick: (date: Date) => void;
}

const Week = ({
  date,
  selected,
  highlight = new Set<string>(),
  onClick,
}: WeekProps) => {
  const day = dayjs(date);
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const startOfWeek = day.startOf('week');

  const daysOfWeek = new Array(7)
    .fill(0)
    .map((value, index) => dayjs(startOfWeek).add(index, 'day'));

  const handleClick = (date: Date) => {
    onClick(date);
  };

  return (
    <s.Table>
      <thead>
        <tr>
          {days.map((day, index) => (
            <td key={day}>
              <Typhography
                color={
                  index === 0 ? 'danger' : index === 6 ? 'secondary' : 'primary'
                }
                shade="700"
              >
                {day}
              </Typhography>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {daysOfWeek.map((day) => (
            <td key={day.date()} onClick={() => handleClick(day.toDate())}>
              <s.Circle
                shade={
                  selected.toDateString() === day.toDate().toDateString()
                    ? '500'
                    : highlight.has(day.format('YYYY-MM-DD'))
                    ? '100'
                    : undefined
                }
              >
                {day.date()}
              </s.Circle>
            </td>
          ))}
        </tr>
      </tbody>
    </s.Table>
  );
};

export default Week;
