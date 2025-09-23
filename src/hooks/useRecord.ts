import type {
  RecordData,
  RecordMenu,
  RecordResponse,
  RecordType,
} from '../types/record';

import ShitIcon from '../assets/images/record/shit.png';
import DropIcon from '../assets/images/record/drop.png';
import MoonIcon from '../assets/images/record/moon.png';
import CutleryIcon from '../assets/images/record/cutlery.png';
import DrainageIcon from '../assets/images/record/drainage.png';
import MedicineIcon from '../assets/images/record/medicine.png';

import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 데이터 임포트

type RecordMenuData = Omit<RecordMenu, 'latestDateTime'>;

const menus: RecordMenuData[] = [
  {
    color: '#f8bb20',
    icon: ShitIcon,
    type: '대변',
  },
  {
    color: '#fbca35',
    icon: DropIcon,
    type: '소변',
  },
  {
    color: '#aba697',
    icon: MoonIcon,
    type: '수면',
  },
  {
    color: '#dbb78e',
    icon: CutleryIcon,
    type: '식사',
  },
  {
    color: '#e5b5b5',
    icon: DrainageIcon,
    type: '유축',
  },
  {
    color: '#a6e3af',
    icon: MedicineIcon,
    type: '약',
  },
];

const useRecord = () => {
  const getMenu = (records: RecordData[]): RecordMenu[] => {
    return menus.map((menu: RecordMenuData): RecordMenu => {
      return {
        ...menu,
        latestDateTime:
          records.find((record) => record.type === menu.type)?.latestDateTime ||
          null,
      };
    });
  };

  const findMenuByType = (type: RecordType): RecordMenuData | undefined => {
    return menus.find((menu) => menu.type === type);
  };

  const groupRecord = (data: RecordResponse[]) => {
    const result: Record<string, RecordResponse[]>[] = [];
    let lastGroup = '',
      last: RecordResponse[] = [];

    dayjs.locale('ko');

    data.forEach((data) => {
      const current = dayjs(data.endDateTime ?? data.startDateTime).format(
        'M월 D일 (dddd)'
      );
      if (lastGroup !== current) {
        lastGroup = current;
        last = [];
        result.push({ [current]: last });
      }
      last.push(data);
    });

    return result;
  };

  return { getMenu, findMenuByType, groupRecord };
};

export default useRecord;
