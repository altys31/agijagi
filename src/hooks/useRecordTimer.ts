import { useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { AxiosResponse } from 'axios';

import dayjs from 'dayjs';

import duration from 'dayjs/plugin/duration';

import { RecordData } from '../types/record';

import now from '../utils/now';

import useFetchLatestRecords from './api/useGetLatestRecords';

const useRecordTimer = (key: string) => {
  const queryClient = useQueryClient();
  const [, setUpdate] = useState({});
  const timerRef = useRef<NodeJS.Timer>();

  dayjs.extend(duration);

  const getStart = () => {
    return localStorage.getItem(key);
  };

  const start = () => {
    localStorage.setItem(key, now());
    isActive();
  };

  const stop = (): string | null => {
    const start = getStart();
    localStorage.removeItem(key);
    isActive();

    queryClient.setQueryData(
      useFetchLatestRecords.queryKey,
      (data: AxiosResponse<RecordData[]>) => {
        data.data.map((data) => {
          return {
            type: data.type,
            latestDateTime: data.type === key ? now() : data.latestDateTime,
          };
        });
      }
    );

    return start;
  };

  const isActive = (): boolean => {
    const result = !!localStorage.getItem(key);

    if (result && !timerRef.current) {
      setUpdate({});

      timerRef.current = setInterval(() => {
        setUpdate({});
      }, 1000);
    } else if (!result && !timerRef.current) {
      clearInterval(timerRef.current);
    }

    return result;
  };

  const getTimer = (): string => {
    return dayjs
      .duration(dayjs(new Date()).diff(getStart(), 'second'), 'seconds')
      .format('HH:mm:ss');
  };

  return { getStart, start, stop, isActive, getTimer };
};

export default useRecordTimer;
