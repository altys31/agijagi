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

  http.post('https://api.password926.site/members', async (req) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.request.body as any;
    console.log('Signup request body:', body);
    return HttpResponse.json({
        memberId: 1,
        email: body.email,
      }, { status: 201 });
  }),

];