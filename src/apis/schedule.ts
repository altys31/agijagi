import { ScheduleData, ScheduleResponse } from '../types/schedule';

import { axiosInstance } from './axiosInstance';

interface AddScheduleProps {
  childId: number;
  data: ScheduleData;
}

interface AddScheduleByVoiceProps {
  childId: number;
  name: string;
  extension: string;
  base64Data: string;
}

interface DeleteScheduleProps {
  childId: number;
  scheduleId: number;
}

interface EditScheduleProps {
  childId: number;
  scheduleId: number;
  data: ScheduleData;
}

export const addSchedule = ({ childId, data }: AddScheduleProps) => {
  return axiosInstance.post(`/children/${childId}/schedules`, data);
};

export const addScheduleByVoice = ({
  childId,
  ...data
}: AddScheduleByVoiceProps) => {
  return axiosInstance.post(`/children/${childId}/schedules/voice`, data);
};

export const getSchedules = (childId: number, start: string, end: string) => {
  return axiosInstance.get<ScheduleResponse[]>(
    `/children/${childId}/schedules?startDate=${start}&endDate=${end}`
  );
};

export const editSchedule = ({
  childId,
  scheduleId,
  data,
}: EditScheduleProps) => {
  return axiosInstance.patch(
    `/children/${childId}/schedules/${scheduleId}`,
    data
  );
};

export const deleteSchedule = ({
  childId,
  scheduleId,
}: DeleteScheduleProps) => {
  return axiosInstance.delete(`/children/${childId}/schedules/${scheduleId}`);
};
