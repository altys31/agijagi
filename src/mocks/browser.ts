import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import moment from 'moment';
import dayjs from 'dayjs';
import { RecordData} from '../types/record';
import { authHandlers } from './authHandler';
import { childHandler } from './childHandler';
import { memberHandler } from './memberHandler';
import { scheduleHandler } from './scheduleHandler';
import { diaryHandler } from './diaryHandler';

const recordData: RecordData[] = [];

const recordAdd = (record: RecordData) => {
  const entry: RecordData = { ...record } as RecordData;
  if (!entry.latestDateTime) {
    entry.latestDateTime = moment().toISOString();
  }
  recordData.push(entry);
}
  
export const handlers = [

  http.get(`https://api.password926.site/children/:childId/followers`, () => {
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

  // 아기 기록 모킹
  http.get('https://api.password926.site/children/:childId/records/latest', () => {
    return HttpResponse.json(recordData);
  }),

  http.get(`https://api.password926.site/children/:childId/records?startDate=${dayjs().subtract(1, 'month').format('YYYY-MM-DD')}&endDate=${dayjs().format('YYYY-MM-DD')}`, () => {
    return HttpResponse.json(recordData);
  }),

  http.post('https://api.password926.site/children/:childId/records', async (req) => {
    const body = await req.request.json(); 
    recordAdd(body as RecordData);
    return HttpResponse.json({}, { status: 200 });
  }),

  // 동화 관련 모킹
  //  http.get('https://api.password926.site/stories', () => {
  //   return HttpResponse.json([]);
  // }),

  http.get('https://api.password926.site/stories?childId=:childId', () => {
    return HttpResponse.json([]);
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

export const worker = setupWorker(
  ...authHandlers,
  ...memberHandler,
  ...scheduleHandler,
  ...diaryHandler,
  ...childHandler,
  ...handlers,
);