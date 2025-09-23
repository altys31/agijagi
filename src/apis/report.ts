import { axiosInstance } from './axiosInstance';

export interface ReportList {
  id: number;
  month: number;
  createAt: string;
}

export interface Report {
  currWeight: number;
  content: string;
  growthDegree: number;
  maxDegree: number;
  createdAt: string;
  graphData: GraphDataDetail[];
}

interface GraphDataDetail {
  day: number;
  weight: number;
  standardWeight: number;
}

interface ReportProps {
  childId: number;
  reportId: number;
}

export const getReportList = (childId: number) => {
  return axiosInstance.get<ReportList[]>(`/children/${childId}/reports`);
};

export const postReport = (childId: number) => {
  return axiosInstance.post<{ id: number }>(`/children/${childId}/reports`);
};

export const getReport = (childId: number, reportId: number) => {
  return axiosInstance.get<Report>(`/children/${childId}/reports/${reportId}`);
};

export const deleteReport = ({ childId, reportId }: ReportProps) => {
  return axiosInstance.delete(`/children/${childId}/reports/${reportId}`);
};
