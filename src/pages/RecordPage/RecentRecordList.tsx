import dayjs from 'dayjs';
import Empty from '../../components/Record/Empty';

import RecordList from '../../components/Record/RecordList';

import useDeleteRecord from '../../hooks/api/useDeleteRecord';
import useGetRecords from '../../hooks/api/useGetRecords';
import useDialog from '../../hooks/useDialog';
import useRecord from '../../hooks/useRecord';

import useChildStore from '../../stores/useChlidStore';

const RecentRecordList = () => {
  const { childId } = useChildStore();

  const { data } = useGetRecords(
    childId,
    dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD')
  );
  const { mutate } = useDeleteRecord();

  const { confirm } = useDialog();

  const { findMenuByType, groupRecord } = useRecord();

  const handleListClick = async (id: number) => {
    if (await confirm('선택한 기록을 삭제할까요?')) {
      mutate({ childId, recordId: id });
      return;
    }
  };

  return (
    <>
      {data.length === 0 ? (
        <Empty />
      ) : (
        groupRecord([...data].reverse()).map((group) => (
          <RecordList.Group
            key={Object.keys(group)[0]}
            title={Object.keys(group)[0]}
          >
            {Object.values(group)[0].map((item) => {
              const menu = findMenuByType(item.type);
              return (
                <RecordList.Item
                  key={item.id}
                  icon={menu!.icon}
                  color={menu!.color}
                  title={menu!.type}
                  description=""
                  date={`${dayjs(item.startDateTime).format('HH:mm')}${
                    item.endDateTime
                      ? ` ~ ${dayjs(item.endDateTime).format('HH:mm')}`
                      : ''
                  }`}
                  onClick={() => handleListClick(item.id)}
                />
              );
            })}
          </RecordList.Group>
        ))
      )}
    </>
  );
};
export default RecentRecordList;
