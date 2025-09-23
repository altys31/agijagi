import useRecord from '../../hooks/useRecord';
import useGetLatestRecords from '../../hooks/api/useGetLatestRecords';

import RecordButton from '../../components/Record/RecordButton';

import useChildStore from '../../stores/useChlidStore';

const RecordMenu = () => {
  const { childId } = useChildStore();

  const { data } = useGetLatestRecords(childId);

  const record = useRecord();

  return (
    <>
      {record.getMenu(data).map((menu) => (
        <RecordButton key={menu.type} {...menu} toggle={menu.type === '수면'} />
      ))}
    </>
  );
};

export default RecordMenu;
