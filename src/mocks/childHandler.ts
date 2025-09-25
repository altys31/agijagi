import { http, HttpResponse } from "msw";

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



export const childHandler = [

  http.get('https://api.password926.site/children', () => {
    return HttpResponse.json([
      {
    childId: 1,
    name: "김정호",
    nickname: "귀요미 정호",
    gender: "남아",
    birthday: "2024-12-15",
    birthWeight: 3.3,
    birthHeight: 50,
    imageUrl: null,
    authority: "WRITE",
    followerNum: 5,
      },
    ]);
  }),

  http.get('https://api.password926.site/children/:childId', () => {
    return HttpResponse.json({
      childId: 1,
      name: "김정호",
      nickname: "귀요미 정호",
      gender: "남아",
      birthday: "2024-12-15",
      birthWeight: 3.3,
      birthHeight: 50,
      imageUrl: null,
      authority: "WRITE",
      followerNum: 5,
    });
  }),
  

];