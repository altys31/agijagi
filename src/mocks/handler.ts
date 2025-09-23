import { http, HttpResponse } from 'msw'

export const handlers = 
  http.post('https://api.password926.site/auth/login', () => {
    return HttpResponse.json({
      data: {
        memberId: 1,
        email: "altys31@gmail.com",
      }
    });
  })