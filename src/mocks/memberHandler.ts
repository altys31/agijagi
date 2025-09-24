import { http, HttpResponse } from "msw";

const memberData = {
  memberId: 1,
  email: "altys31@gmail.com",
  nickname: "정호아빠",
  profileImageUrl: null,
};

export const memberHandler = [
    http.get('https://api.password926.site/members/1', () => {
    return HttpResponse.json(memberData);
  }),
];