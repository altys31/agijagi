import { http, HttpResponse } from "msw";

export const childHandler = [

  http.get('https://api.password926.site/children', () => {
    return HttpResponse.json([
      {
        childId: 1,
        name: "김정호",
        nickname: "귀요미 정호",
        gender: "남아",
        birthday: "2024-08-01",
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
      imageUrl: null,
      authority: "WRITE",
      followerNum: 5,
    });
  }),

];