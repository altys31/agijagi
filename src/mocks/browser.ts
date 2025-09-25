import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import moment from 'moment';
import dayjs from 'dayjs';
import { RecordData, RecordResponse, RecordRequest } from '../types/record';
import { authHandlers } from './authHandler';
import { childHandler } from './childHandler';
import { memberHandler } from './memberHandler';
import { scheduleHandler } from './scheduleHandler';
import { diaryHandler } from './diaryHandler';
import { reportHandler } from './reportHandler';
import { boardHandler } from './boardHandler';

// msw용 타입
interface RecordAllType extends RecordData, RecordResponse {}

// sample initial records (msw 전용 통합 형태)
let recordId = 1;
const recordData: RecordAllType[] = [
  {
    id: recordId,
    type: '식사',
    startDateTime: moment().set('hour', 8).set('minute', 30).toISOString(),
    endDateTime: null,
    latestDateTime: moment().set('hour', 8).set('minute', 30).toISOString(),
  },
];

const recordAdd = (record: RecordRequest) => {
  const id = ++recordId;
  const latest = record.startDateTime || moment().toISOString();
  const newEntry: RecordAllType = {
    id,
    type: record.type,
    startDateTime: record.startDateTime,
    endDateTime: record.endDateTime,
    latestDateTime: latest,
  };
  recordData.push(newEntry);
  return newEntry;
};
  
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
  
  http.delete('https://api.password926.site/children/:childId/records/:id', (req) => {
    const { id } = req.params;
    const index = recordData.findIndex(r => r.id === Number(id));
    if (index !== -1) {
      recordData.splice(index, 1);
      return HttpResponse.json({}, { status: 204 });
    }
    return HttpResponse.json({ error: 'Not found' }, { status: 404 });
  }),

  http.post('https://api.password926.site/children/:childId/records', async (req) => {
    const body = await req.request.json(); 
    recordAdd(body as RecordAllType);
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
        message: "MSW 상으로 아직 구현되지 않거나 불가능한 요청입니다.",
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
  ...reportHandler,
  ...boardHandler,
  ...handlers,
);