import { axiosInstance } from './axiosInstance';

export interface DevelopmentStage {
  title: string;
  milestones: MilestoneDetail[];
}

export interface MilestoneDetail {
  id: number;
  content: string;
  requiredAmount: number;
  currentAmount: number;
  date: null | string;
}

interface HeightWeightInfo {
  weight: number;
  height: number;
  month: number;
}

interface PutHeightWeightProps {
  childId: number;
  data: HeightWeightInfo;
}

interface ModifyMilestones {
  id: number;
  currentAmount: number;
}

interface MilestoneData {
  childId: number;
  milestones: ModifyMilestones[];
}

interface patchMilestoneProps {
  childId: number;
  data: MilestoneData;
}

export interface ChildProps {
  childId: number;
  name: string;
  nickname: string;
  gender: string;
  birthday: string;
  birthWeight: number;
  birthHeight: number;
  imageUrl: string;
  authority: string;
  followerNum: number;
}

export interface HeightWeightInfoProps {
  weight: number;
  height: number;
  month: number;
}

export const getMilestone = (childId: number, month: number) => {
  return axiosInstance.get<DevelopmentStage[]>(
    `children/${childId}/milestones?month=${month}`
  );
};

export const putHeightWeight = ({ childId, data }: PutHeightWeightProps) => {
  return axiosInstance.put(`/children/${childId}/growth`, data);
};

export const patchMilestone = ({ childId, data }: patchMilestoneProps) => {
  return axiosInstance.patch(`/children/${childId}/milestones`, data);
};

export const getChildInfo = (childId: number) => {
  return axiosInstance.get<ChildProps>(`/children/${childId}`);
};

export const getHeightWeightInfo = (childId: number) => {
  return axiosInstance.get<HeightWeightInfoProps[]>(`/children/${childId}/growth`);
};