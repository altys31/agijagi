import { useEffect, useRef, useState } from 'react';

import { getReadableTimeDiff } from '../utils/getReadableTimeDiff';

/**
 * 현재 시간과 입력 받은 시간의 차이를 보기 좋은 형태(ex: 1분 전, 10일 전)로 실시간 반환하는 훅
 */
const useTimeDifference = (date: string): string => {
  const timerRef = useRef<NodeJS.Timer | undefined>(undefined);

  const [timeDiff, setTimeDiff] = useState<string>(
    getReadableTimeDiff(new Date(date))
  );

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const update = () => {
      setTimeDiff(getReadableTimeDiff(new Date(date)));
    };

    update();

    timerRef.current = setInterval(() => {
      update();
    }, 1000);
  }, [date]);

  return timeDiff;
};

export default useTimeDifference;
