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
import bookPic1 from '../assets/book/book1.webp';
import bookPic2 from '../assets/book/book2.webp';
import bookPic3 from '../assets/book/book3.webp';
import bookPic4 from '../assets/book/book4.webp';
import bookPic5 from '../assets/book/book5.webp';
import bookPic6 from '../assets/book/book6.webp';

import { url } from 'inspector';

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


const bookPages = [
  [{
      id: 1,
      storyId: 1,
      pageNumber: 1,
      content: '옛날옛적, 구름이 솜사탕처럼 부풀어 있던 하늘 아래 ‘루나’라는 아기가 살고 있었어요. 루나는 아직 말을 할 줄 모르지만, 옹알옹알 마법의 주문을 외우듯이 소리를 냈어요. 그 소리에 놀란 햇살 요정들이 하나둘 모여들었답니다.',
      storyPageImageUrl: bookPic1,
    },
    {
      id: 2,
      storyId: 1,
      pageNumber: 2,
      content: '어느 날, 루나는 아침 햇살 속으로 처음 산책을 나갔어요. 바람이 살짝 불자 루나의 작은 손끝에서 반짝이는 빛이 퍼져나왔어요. 그 빛을 따라 한 마리의 나비가 날아와 루나의 어깨에 내려앉았죠. “안녕, 작은 모험가!” 나비가 속삭이자 루나는 방긋 웃었어요. 나비는 루나를 태우고 작은 숲속 요정 마을로 안내했답니다.',
      storyPageImageUrl: bookPic2,
      },
    {
      id: 3,
      storyId: 1,
      pageNumber: 3,
      content: '그곳에는 음악을 사랑하는 도토리 요정들이 살고 있었어요. 그들은 루나에게 반짝이는 헤드폰을 선물했어요. 헤드폰을 귀에 대자 루나는 세상에서 가장 아름다운 멜로디를 들었어요. 작은 새들의 노래, 바람의 속삭임, 꽃잎이 열리는 소리까지… 모든 자연의 음악이 한데 어우러져 있었답니다. 루나는 음악에 맞춰 팔을 벌리고 신나게 흔들었어요. 요정들도 함께 춤을 췄죠',
      storyPageImageUrl: bookPic3,
      },
    {
      id: 4,
      storyId: 1,
      pageNumber: 4,
      content: '그러다 루나는 점점 졸음이 쏟아져 요정들의 부드러운 이불 위에 누워버렸어요. 이불은 구름처럼 포근했고, 꿈속에서는 나비와 함께 하늘을 나는 모험을 이어갔답니다.',
      storyPageImageUrl: bookPic4,
    },
  {
      id: 5,
      storyId: 1,
      pageNumber: 5,
      content: '햇살 요정들은 루나의 작은 이마에 키스를 하며 속삭였어요. “작은 모험가야, 오늘의 기억을 잊지 마렴. 네 웃음은 이 세상을 빛나게 할 거야."',
      storyPageImageUrl: bookPic5,
    },
    {
      id: 6,
      storyId: 1,
      pageNumber: 6,
      content: '그렇게 루나는 꿈과 현실이 섞인 특별한 하루를 보내고, 다시 부모님의 품으로 돌아왔어요. 그날 이후 루나의 웃음소리는 언제나 햇살처럼 빛나게 되었답니다.',
      storyPageImageUrl: bookPic6,
    },
  ],
]
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

  http.get('https://api.password926.site/children/:childId/records', (req) => {
    // parse optional startDate/endDate query params and filter records by latestDateTime
    const url = new URL(req.request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (!startDate && !endDate) {
      return HttpResponse.json(recordData);
    }

    const start = startDate ? dayjs(startDate).startOf('day') : dayjs().subtract(1, 'month').startOf('day');
    const end = endDate ? dayjs(endDate).endOf('day') : dayjs().endOf('day');

    const matched = recordData.filter((r) => {
      const t = dayjs(r.latestDateTime);
      const tv = t.valueOf();
      const sv = start.valueOf();
      const ev = end.valueOf();
      return tv >= sv && tv <= ev;
    });

    return HttpResponse.json(matched);
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

  http.get('https://api.password926.site/stories', (req) => {
    // handle ?childId= query param
    const url = new URL(req.request.url);
    const childId = url.searchParams.get('childId');

    return HttpResponse.json([
      {
        id: 1,
        childId: childId ? Number(childId) : 1,
        title: '햇살 요정과 작은 모험가',
        startDate: '2025-09-22',
        endDate: '2025-10-01',
        createdAt: '2025-10-01T12:00:00Z',
        coverImageIndex: 3,
      },
    ]);
  }),

  http.get('https://api.password926.site/stories/:storyId/pages', (req) => {
    const { storyId } = req.params;
    return HttpResponse.json(bookPages[Number(storyId) - 1]);
  }),

  // Catch-all 핸들러 (정의되지 않은 요청 처리)

  // Lightweight ping endpoint used to keep service worker active during dev
  http.get('https://api.password926.site/__msw_ping', () => {
    return HttpResponse.json({ ok: true });
  }),

  // Also handle same-origin relative paths that the app may call (favicon, local ping)
  http.get('/__msw_ping', () => {
    return HttpResponse.json({ ok: true });
  }),

  http.get('/favicon.ico', () => {
    // respond with 204 no content for favicon to suppress network warnings
    return HttpResponse.json({}, { status: 204 });
  }),


  http.all('https://api.password926.site/*', () => {
    return HttpResponse.json(
      {
        error: 'This request is not mocked',
        message: "MSW 환경에서 불가능한 요청입니다.",
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