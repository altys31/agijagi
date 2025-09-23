export interface UserData {
  email: string;
  password: string;
  nickname: string;
  profileImg: File | null;
}

export type BabyGender = '남아' | '여아' | '모름';
export type Authority = 'WRITE' | 'READ';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MemberResponse {
  memberId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
}

export interface BabyResponse {
  childId: number;
  name: string;
  nickname: string;
  gender: BabyGender;
  birthday: string;
  imageUrl: string | null;
  authority: Authority;
  followerNum: number;
}

export interface EditUserRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface EditUserImageRequest {
  image: File | null;
}
