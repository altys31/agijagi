import { BabyGender } from './user';

export type Authority = 'READ' | 'WRITE';

export interface ChildRequest {
  name: string;
  nickname: string;
  gender: BabyGender;
  birthday: string;
  image: File | null;
  birthWeight: string;
  birthHeight: string;
}
export interface EditChildInfoRequest {
  childId: number;
  name: string;
  nickname: string;
  gender: BabyGender;
  birthday: string;
}

export interface EditChildImageRequest {
  childId: number;
  image: File | null;
}

export interface DeleteChildRequest {
  childId: number;
}

export interface DeleteChildImageRequest {
  childId: number;
}

export interface GetFollowerRequest {
  childId: number;
}

export interface FollowerResponse {
  followerId: number;
  nickname: string;
  authority: Authority;
  imageUrl: string;
}

export interface EditFollowerRequest {
  childId: number;
  followerId: number;
  authority: Authority;
}

export interface DeleteFollowerRequest {
  childId: number;
  followerId: number;
}

export interface InviteCodeResponse {
  invitationCode: string;
}

export interface InviteCodeRequest {
  invitationCode: string;
}
