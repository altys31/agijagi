import type {
  RecordData,
  RecordRequest,
  RecordResponse,
} from '../types/record';

import { axiosInstance } from './axiosInstance';

interface AddRecordProps {
  childId: number;
  data: RecordRequest;
}

interface DeleteRecordProps {
  childId: number;
  recordId: number;
}

export const getLatestRecords = (childId: number) => {
  return axiosInstance.get<RecordData[]>(`/children/${childId}/records/latest`);
};

export const addRecord = ({ childId, data }: AddRecordProps) => {
  return axiosInstance.post(`/children/${childId}/records`, data);
};

export const getRecords = (childId: number, start: string, end: string) => {
  return axiosInstance.get<RecordResponse[]>(
    `/children/${childId}/records?startDate=${start}&endDate=${end}`
  );
};

export const deleteRecord = ({ childId, recordId }: DeleteRecordProps) => {
  return axiosInstance.delete(`/children/${childId}/records/${recordId}`);
};
