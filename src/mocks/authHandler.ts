import { http, HttpResponse } from "msw";

const memberData = {
  data: {
    memberId: 1,
    email: "altys31@gmail.com",
  },
};

export const authHandlers = [

    // 로그인 요청 모킹
  http.post('https://api.password926.site/auth/login', () => {
    return HttpResponse.json(memberData);
  }),

  // 로그아웃 요청 모킹
  http.post('https://api.password926.site/auth/logout', () => {
    return HttpResponse.json({
      message: 'Logout successful',
    });
  }),

  http.get('https://api.password926.site/members', () => {
    return HttpResponse.json({
    });
  }),
  

];