import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import babyVideo from '../assets/diary/babyVideo1.mp4';
import babyPic1 from '../assets/diary/babyPic1.jpg';
import babyPic2 from '../assets/diary/babyPic2.webp';
import babyPic3 from '../assets/diary/babyPic3.webp';
import { start } from 'repl';
import moment from 'moment';
import dayjs from 'dayjs';
import { RecordData, RecordResponse } from '../types/record';

const today = moment().format('YYYY-MM-DD');

const memberData = {
  data: {
    memberId: 1,
    email: "altys31@gmail.com",
  },
};

// eslint-disable-next-line prefer-const
let recordData: RecordData[] = [{
  type: "식사",
  latestDateTime: moment().set('hour', 8).set('minute', 30).toISOString(),
}];
  
const recordAdd = (record:RecordData) => {
  recordData.push(record);  
}
  
export const handlers = [
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
      message: 'Logout successful',
    });
  }),

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

  http.get('https://api.password926.site/children/1', () => {
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

  http.get(`https://api.password926.site/children/${1}/schedules?startDate=${today}&endDate=${today}`, () => {

    return HttpResponse.json([{
      id: 1,
      startDateTime: moment().set('hour', 9).set('minute', 0).toISOString(),
      endDateTime: moment().set('hour', 11).set('minute', 0).toISOString(),
      title: "가람 소아과 방문",
      description: "가람 소아과에서 예방접종 9시 예약",
    }]);
  }),

    


  http.get('https://api.password926.site/members/1', () => {
    return HttpResponse.json({
      memberId: 1,
      email: "altys31@gmail.com",
      nickname: "정호아빠",
      profileImageUrl: null,
    });
  }),


  http.get(`https://api.password926.site/diaries?childId=${1}`, () => {
    return HttpResponse.json([
      {
        id: 1,
        childId: 1,
        memberId: 1,
        content: "오늘 아가는 아기 침대에서 귀엽게 옹알이하며 놀다가 지쳐버렸어요. 작은 손발을 흔들며 웃는 모습이 너무 사랑스러워 한참을 바라봤답니다. 그렇게 놀던 아기가 이제 포근한 이불 위에서 천사처럼 깊이 잠들었어요. 하루하루가 이렇게 소중하고 감사하네요.",
        createdAt: moment(),
        wroteAt: moment().subtract(2, 'days').toISOString(),
        mediaUrls: [babyVideo, babyPic2],
        mediaTypes: ["video", "image"],
      },
      {
        id: 2,
        childId: 1,
        memberId: 1,
        content: "오늘 우리 아가가 처음으로 헤드폰을 썼는데 너무 좋아했어요! 음악에 맞춰 팔을 벌리고 웃는 모습이 정말 사랑스러웠답니다.이렇게 순수한 웃음 덕분에 하루가 행복해요~.",
        createdAt: moment(),
        wroteAt: moment().subtract(7, 'days').toISOString(),
        mediaUrls: [babyPic1],
        mediaTypes: ["image"],
      },
      {
        id: 3,
        childId: 1,
        memberId: 1,
        content: "오늘 우리 아가가 세상에 태어났어요. 아직 작은 몸으로 인큐베이터 속에 있지만, 힘차게 숨 쉬는 모습이 너무 대견합니다. 이렇게 만나게 되니 그동안의 기다림이 모두 보상받는 느낌이에요. 우리 아가가 앞으로 건강하고 행복하게 자라주길...",
        createdAt: "2024-12-15",
        wroteAt: "2024-12-15",
        mediaUrls: [babyPic3],
        mediaTypes: ["image"],
      }
    ]);
  }),

  http.get(`https://api.password926.site/children/${1}/followers`, () => {
    return HttpResponse.json([
      {
        followerId: 1,
        nickname: "정호아빠",
        authority: "WRITE",
        imageUrl: null,
      },
      {
        followerId: 2,
        nickname: "아기자기",
        authority: "READ",
        imageUrl: "https://picsum.photos/200/301.webp",
      },
      {
        followerId: 3,
        nickname: "주니",
        authority: "READ",
        imageUrl: "https://picsum.photos/200/302.webp",
      },
      {
        followerId: 4,
        nickname: "정호맘",
        authority: "READ",
        imageUrl: "https://picsum.photos/200/304.webp",
      }, {
        followerId: 5,
        nickname: "🐶🐶",
        authority: "READ",
        imageUrl: "https://picsum.photos/200/305.webp",
      },
    ]);
  }),

  http.get('https://api.password926.site/children/1/records/latest', () => {
    return HttpResponse.json(recordData);
  }),

  http.get(`https://api.password926.site/children/1/records?startDate=${dayjs().subtract(1, 'month').format('YYYY-MM-DD')}&endDate=${dayjs().format('YYYY-MM-DD')}`, () => {
    return HttpResponse.json(recordData);
  }),

  http.post('https://api.password926.site/children/1/records', async (req) => {
    const body = await req.request.json(); 
    recordAdd(body as RecordData);
    return HttpResponse.json({}, { status: 200 });
  }),

    

  // Catch-all 핸들러 (정의되지 않은 요청 처리)

  http.all('https://api.password926.site/*', () => {
    return HttpResponse.json(
      {
        error: 'This request is not mocked',
        message: "MSW 환경에서는 불가능한 요청입니다.",
       },
      { status: 404 },
    );
    }),

];

export const worker = setupWorker(...handlers);