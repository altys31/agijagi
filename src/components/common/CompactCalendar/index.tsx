import dayjs from 'dayjs';

import { useEffect, useRef, useState } from 'react';

import useSwipe from '../../../hooks/useSwpie';

import * as s from './CompactCalendar.style';

import Week from './Week';

interface CompactCalendarProps {
  date: Date;
  highlight?: Set<string>;
  onChange: (date: Date) => void;
  onClick: (date: Date) => void;
}

const CompactCalendar = ({
  date,
  highlight = new Set<string>(),
  onChange,
  onClick,
}: CompactCalendarProps) => {
  const [selected, setSelected] = useState<Date>(date);

  const swipeRef = useRef<HTMLDivElement>(null);

  const swipe = useSwipe<HTMLDivElement>(swipeRef);

  const week = dayjs(date).add(swipe.index, 'week');
  const lastWeek = dayjs(week).add(-1, 'week');
  const nextWeek = dayjs(week).add(1, 'week');

  const handleClick = (date: Date) => {
    setSelected(date);
    onClick(date);
  };

  useEffect(() => {
    onChange(dayjs(date).add(swipe.index, 'week').startOf('week').toDate());
  }, [swipe.index]);

  return (
    <s.Container>
      <s.Swipe ref={swipeRef}>
        <Week
          date={lastWeek.toDate()}
          selected={selected}
          onClick={handleClick}
        />
        <Week
          date={week.toDate()}
          selected={selected}
          highlight={highlight}
          onClick={handleClick}
        />
        <Week
          date={nextWeek.toDate()}
          selected={selected}
          onClick={handleClick}
        />
      </s.Swipe>
    </s.Container>
  );
};

export default CompactCalendar;
