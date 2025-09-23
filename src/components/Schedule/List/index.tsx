import Schedule from '..';

import useGetSchedules from '../../../hooks/api/useGetSchedules';
import useModal from '../../../hooks/useModal';

import EditSchedulePage from '../../../pages/SchedulePage/EditSchedulePage';

import useChildStore from '../../../stores/useChlidStore';

import type { ScheduleResponse } from '../../../types/schedule';

interface ScheduleListProps {
  start: string;
  end: string;
}

const List = ({ start, end }: ScheduleListProps) => {
  const { childId } = useChildStore();

  const data = useGetSchedules(childId, start, end);

  const modal = useModal();

  const handleScheduleClick = (data: ScheduleResponse) => {
    modal.push({ children: <EditSchedulePage {...data} /> });
  };

  return (
    <>
      {data.length === 0 ? (
        <Schedule.Empty />
      ) : (
        data.map((item) => (
          <Schedule.Card
            key={item.id}
            title={item.title}
            description={item.description}
            start={item.startDateTime}
            end={item.endDateTime}
            onClick={() => handleScheduleClick(item)}
          />
        ))
      )}
    </>
  );
};

export default List;
