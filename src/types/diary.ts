export interface DiaryResponse {
  id: number;
  childId: number;
  memberId: number;
  content: string;
  createdAt: string;
  wroteAt: string;
  mediaUrls: string[];
  mediaTypes: string[];
}

export interface DiaryRequest {
  childId: number;
  content: string;
  date: string;
  mediaList: File[];
}

export interface EditDiaryRequest {
  storyId: number;
  content: string;
  removeMediaIdList: string[];
  newMediaList: File[];
}

export interface DeleteDiaryRequest {
  removeMediaIdList: string[] | null;
  storyId: number;
}
