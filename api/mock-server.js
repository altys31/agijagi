const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const path = require('path');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Vercel에서 전달되는 요청에 '/api'가 포함될 수 있으므로 안전하게 제거
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) req.url = req.url.slice(4) || '/';
  next();
});

// mock 서버에서 src/assets 폴더를 정적으로 서빙
app.use('/static-assets', express.static(path.join(__dirname, '..', 'src', 'assets')));

// mock 리소스에 사용할 기본 호스트 (포트는 실행 시 환경변수로 바꿀 수 있음)
const MOCK_HOST = process.env.MOCK_HOST || 'http://agijagi.vercel.app';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/* 샘플 in-memory 데이터 */
const memberData = {
  memberId: 1,
  email: "altys31@gmail.com",
  nickname: "정호아빠",
  profileImageUrl: null,
};

let children = [
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
];

let diaryIdCounter = 4;
let diaries = [
  {
    id: 4,
    childId: 1,
    memberId: 1,
    content: "오늘 아가는 아기 침대에서 귀엽게 옹알이하며 놀다가 지쳐버렸어요. 작은 손발을 흔들며 웃는 모습이 너무 사랑스러워 한참을 바라봤답니다. 그렇게 놀던 아기가 이제 포근한 이불 위에서 천사처럼 깊이 잠들었어요. 하루하루가 이렇게 소중하고 감사하네요.",
    createdAt: moment().toISOString(),
    wroteAt: moment().subtract(2, 'days').toISOString(),
    mediaUrls: [`${MOCK_HOST}/static-assets/diary/babyVideo1.mp4`, `${MOCK_HOST}/static-assets/diary/babyPic2.webp`],
    mediaTypes: ["video", "image"],
  },
  {
  id: 3,
  childId: 1,
  memberId: 1,
  content: "오늘 우리 아가가 처음으로 햇살 속을 산책했어요. 바람이 살짝 불 때마다 아가는 작은 요정이 나타난 듯 손을 흔들며 환하게 웃었답니다. 지나가던 나비 한 마리가 아가 옆에 앉아 잠시 놀다 가는 모습이 마치 동화 속 한 장면 같았어요. 이렇게 평범한 순간도 우리에게는 특별한 모험 같네요.",
  createdAt: moment().toISOString(),
  wroteAt: moment().subtract(5, 'days').toISOString(),
  mediaUrls: [`${MOCK_HOST}/static-assets/diary/babyPic4.webp`],
  mediaTypes: ["image"],
  },
  {
    id: 2,
    childId: 1,
    memberId: 1,
    content: "오늘 우리 아가가 처음으로 헤드폰을 썼는데 너무 좋아했어요! 음악에 맞춰 팔을 벌리고 웃는 모습이 정말 사랑스러웠답니다.이렇게 순수한 웃음 덕분에 하루가 행복해요~.",
    createdAt: moment().toISOString(),
    wroteAt: moment().subtract(7, 'days').toISOString(),
    mediaUrls: [`${MOCK_HOST}/static-assets/diary/babyPic1.webp`],
    mediaTypes: ["image"],
  },
  {
    id: 1,
    childId: 1,
    memberId: 1,
    content: "오늘 우리 아가가 세상에 태어났어요. 아직 작은 몸으로 인큐베이터 속에 있지만, 힘차게 숨 쉬는 모습이 너무 대견합니다. 이렇게 만나게 되니 그동안의 기다림이 모두 보상받는 느낌이에요. 우리 아가가 앞으로 건강하고 행복하게 자라주길...",
    createdAt: "2024-12-15",
    wroteAt: "2024-12-15",
    mediaUrls: [`${MOCK_HOST}/static-assets/diary/babyPic3.webp`],
    mediaTypes: ["image"],
  }
];

const followers = [
  { followerId: 1, nickname: "정호아빠", authority: "WRITE", imageUrl: null },
  { followerId: 2, nickname: "아기자기", authority: "READ", imageUrl: "https://picsum.photos/200/301.webp" },
  { followerId: 3, nickname: "주니", authority: "READ", imageUrl: "https://picsum.photos/200/302.webp" },
  { followerId: 4, nickname: "정호맘", authority: "READ", imageUrl: "https://picsum.photos/200/304.webp" },
  { followerId: 5, nickname: "🐶🐶", authority: "READ", imageUrl: "https://picsum.photos/200/305.webp" },
];

let scheduleIdCounter = 3;
let schedules = [
  {
    id: 1,
    startDateTime: moment().set('hour', 9).set('minute', 0).toISOString(),
    endDateTime: moment().set('hour', 11).set('minute', 0).toISOString(),
    title: "가람 소아과 방문",
    description: "가람 소아과에서 예방접종 9시 예약",
  },
  {
    id: 2,
    startDateTime: moment().set('hour', 14).set('minute', 0).toISOString(),
    endDateTime: moment().set('hour', 15).set('minute', 0).toISOString(),
    title: "치과 예약",
    description: "치과에서 정기 검진 예약",
  },
];

let recordId = 1;
let records = [
  { id: recordId, type: '식사', startDateTime: moment().set('hour',8).set('minute',30).toISOString(), endDateTime: null, latestDateTime: moment().set('hour',8).set('minute',30).toISOString() }
];

const stories = [
  { id: 1, childId: 1, title: '햇살 요정과 작은 모험가', startDate: '2025-09-22', endDate: '2025-10-01', createdAt: '2025-10-01T12:00:00Z', coverImageIndex: 3 },
];
const storyPages = {
  1: [{
      id: 1,
      storyId: 1,
      pageNumber: 1,
      content: '옛날옛적, 구름이 솜사탕처럼 부풀어 있던 하늘 아래 ‘루나’라는 아기가 살고 있었어요. 루나는 아직 말을 할 줄 모르지만, 옹알옹알 마법의 주문을 외우듯이 소리를 냈어요. 그 소리에 놀란 햇살 요정들이 하나둘 모여들었답니다.',
      storyPageImageUrl: `${MOCK_HOST}/static-assets/book/book1.webp`,
    },
    {
      id: 2,
      storyId: 1,
      pageNumber: 2,
      content: '어느 날, 루나는 아침 햇살 속으로 처음 산책을 나갔어요. 바람이 살짝 불자 루나의 작은 손끝에서 반짝이는 빛이 퍼져나왔어요. 그 빛을 따라 한 마리의 나비가 날아와 루나의 어깨에 내려앉았죠. “안녕, 작은 모험가!” 나비가 속삭이자 루나는 방긋 웃었어요. 나비는 루나를 태우고 작은 숲속 요정 마을로 안내했답니다.',
      storyPageImageUrl:  `${MOCK_HOST}/static-assets/book/book2.webp`,
      },
    {
      id: 3,
      storyId: 1,
      pageNumber: 3,
      content: '그곳에는 음악을 사랑하는 도토리 요정들이 살고 있었어요. 그들은 루나에게 반짝이는 헤드폰을 선물했어요. 헤드폰을 귀에 대자 루나는 세상에서 가장 아름다운 멜로디를 들었어요. 작은 새들의 노래, 바람의 속삭임, 꽃잎이 열리는 소리까지… 모든 자연의 음악이 한데 어우러져 있었답니다. 루나는 음악에 맞춰 팔을 벌리고 신나게 흔들었어요. 요정들도 함께 춤을 췄죠',
      storyPageImageUrl:  `${MOCK_HOST}/static-assets/book/book3.webp`,
      },
    {
      id: 4,
      storyId: 1,
      pageNumber: 4,
      content: '그러다 루나는 점점 졸음이 쏟아져 요정들의 부드러운 이불 위에 누워버렸어요. 이불은 구름처럼 포근했고, 꿈속에서는 나비와 함께 하늘을 나는 모험을 이어갔답니다.',
      storyPageImageUrl: `${MOCK_HOST}/static-assets/book/book4.webp`,
    },
  {
      id: 5,
      storyId: 1,
      pageNumber: 5,
      content: '햇살 요정들은 루나의 작은 이마에 키스를 하며 속삭였어요. “작은 모험가야, 오늘의 기억을 잊지 마렴. 네 웃음은 이 세상을 빛나게 할 거야."',
      storyPageImageUrl:  `${MOCK_HOST}/static-assets/book/book5.webp`,
    },
    {
      id: 6,
      storyId: 1,
      pageNumber: 6,
      content: '그렇게 루나는 꿈과 현실이 섞인 특별한 하루를 보내고, 다시 부모님의 품으로 돌아왔어요. 그날 이후 루나의 웃음소리는 언제나 햇살처럼 빛나게 되었답니다.',
      storyPageImageUrl:  `${MOCK_HOST}/static-assets/book/book6.webp`,
    },
  ]
};

const reports = [
  { id: 4, month: 9, createAt: "2025-09-15" },
  { id: 3, month: 6, createAt: "2025-06-15" },
  { id: 2, month: 4, createAt: "2025-04-20" },
  { id: 1, month: 2, createAt: "2025-02-13" },
];
const reportDetails = {
  1: { id:1, currWeight:4.2, content:'샘플 리포트', growthDegree:90, maxDegree:100, createdAt:'2025-02-13', graphData: [] }
};

let postId = 3;
let commentId = 4;
let posts = [
  { postId: 2, title: '아기 규현입니다.', content: '이땐 귀여웠는데...', writerId: 2, writerNickname: '양규현', createdAt: new Date().toISOString(), mediaUrls: [] },
  { postId: 1, title: '저 놀러간 사진 좀 보세요', content: '봤으면 저리가', writerId: 1, writerNickname: '양규현', createdAt: new Date().toISOString(), mediaUrls: [] },
];
let comments = [
  { commentId: 1, parentCommentId: 2, writerId: 3, writerNickname: '아기자기', content: '무쌩겨써', createdAt: new Date().toISOString(), postId: 1 },
  { commentId: 2, parentCommentId: null, writerId: 2, writerNickname: '여기저기', content: '무쌩겨써222', createdAt: new Date().toISOString(), postId: 1 },
  { commentId: 3, parentCommentId: null, writerId: 4, writerNickname: '싸피싸피', content: 'ㅠㅠ', createdAt: new Date().toISOString(), postId: 2 },
];

/* Routes */

// Ping and favicon
app.get('/__msw_ping', (req, res) => res.json({ ok: true }));

// Auth
app.post('/auth/login', async (req, res) => {
  await delay(100);
  return res.json({ data: { memberId: 1, email: memberData.email }});
});
app.post('/auth/logout', (req, res) => res.json({ message: 'Logout successful' }));

// Members
app.get('/members/:memberId', (req, res) => {
  const { memberId } = req.params;
  if (Number(memberId) === memberData.memberId) return res.json(memberData);
  return res.status(404).json({ error: 'Member not found' });
});
app.get('/members', (req, res) => res.json({}));
app.post('/members', (req, res) => {
  const { email } = req.body;
  return res.status(201).json({ memberId: 1, email });
});

// Children
app.get('/children', (req, res) => res.json(children));
app.get('/children/:childId', (req, res) => {
  const child = children.find(c => c.childId === Number(req.params.childId));
  if (!child) return res.status(404).json({ error: 'Not found' });
  return res.json(child);
});

// Followers
app.get('/children/:childId/followers', (req, res) => {
  return res.json(followers);
});

// Schedules
app.get('/children/:childId/schedules', (req, res) => {
  const { startDate, endDate } = req.query;
  let matched = schedules;
  if (startDate || endDate) {
    const start = startDate ? moment(startDate).startOf('day') : moment().startOf('day');
    const end = endDate ? moment(endDate).endOf('day') : moment().endOf('day');
    matched = schedules.filter(s => {
      const t = moment(s.startDateTime);
      return t.isBetween(start, end, undefined, '[]');
    });
  }
  return res.json(matched);
});
app.post('/children/:childId/schedules', (req, res) => {
  const body = req.body;
  const newSchedule = { id: scheduleIdCounter++, ...body };
  schedules.push(newSchedule);
  return res.json(newSchedule);
});
app.patch('/children/:childId/schedules/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = schedules.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  schedules[idx] = { ...schedules[idx], ...req.body };
  return res.json(schedules[idx]);
});
app.delete('/children/:childId/schedules/:id', (req, res) => {
  const id = Number(req.params.id);
  schedules = schedules.filter(s => s.id !== id);
  return res.json(schedules);
});

// Records
app.get('/children/:childId/records/latest', (req, res) => res.json(records));
app.get('/children/:childId/records', (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate && !endDate) return res.json(records);
  const start = startDate ? moment(startDate).startOf('day') : moment().subtract(1, 'month').startOf('day');
  const end = endDate ? moment(endDate).endOf('day') : moment().endOf('day');
  const matched = records.filter(r => {
    const t = moment(r.latestDateTime);
    return t.isBetween(start, end, undefined, '[]');
  });
  return res.json(matched);
});
app.post('/children/:childId/records', (req, res) => {
  const entry = { id: ++recordId, ...req.body };
  records.push(entry);
  return res.json({});
});
app.delete('/children/:childId/records/:id', (req, res) => {
  records = records.filter(r => r.id !== Number(req.params.id));
  return res.status(204).end();
});

// Stories
app.get('/stories', (req, res) => {
  const childId = req.query.childId ? Number(req.query.childId) : 1;
  return res.json(stories.map(s => ({ ...s, childId })));
});
app.get('/stories/:storyId/pages', (req, res) => {
  const pages = storyPages[Number(req.params.storyId)] || [];
  return res.json(pages);
});

// Reports / milestones
app.get('/children/:childId/reports', (req, res) => res.json(reports));
app.get('/children/:childId/reports/:reportId', (req, res) => {
  const r = reportDetails[Number(req.params.reportId)];
  if (!r) return res.status(404).json({ error: 'Report not found' });
  return res.json(r);
});
app.get('/children/:childId/growth', (req, res) => {
  return res.json([
    { weight: 3.5, height: 50, month: 0 },
    { weight: 4.2, height: 60, month: 2 },
    { weight: 6.1, height: 70, month: 4 },
  ]);
});
app.get('/children/:childId/milestones', (req, res) => {
  return res.json([{ milestone: '첫 뒤집기' }, { milestone: '첫 걸음' }]);
});

// Diaries CRUD
app.get('/diaries', async (req, res) => {
  const childId = req.query.childId ? Number(req.query.childId) : undefined;
  await delay(200);
  const result = childId ? diaries.filter(d => d.childId === childId) : diaries;
  return res.json(result);
});
app.post('/diaries', (req, res) => {
  const body = req.body;
  const newDiary = {
    id: ++diaryIdCounter,
    createdAt: moment().toISOString(),
    childId: body.childId || 1,
    memberId: body.memberId || 1,
    content: body.content || '',
    wroteAt: body.wroteAt || moment().toISOString(),
    mediaUrls: body.mediaUrls || [],
    mediaTypes: body.mediaTypes || [],
  };
  diaries.unshift(newDiary);
  return res.status(201).json(newDiary);
});
app.patch('/diaries/:diaryId', (req, res) => {
  const id = Number(req.params.diaryId);
  const idx = diaries.findIndex(d => d.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  diaries[idx] = { ...diaries[idx], ...req.body };
  return res.json(diaries[idx]);
});
app.delete('/diaries/:diaryId', (req, res) => {
  diaries = diaries.filter(d => d.id !== Number(req.params.diaryId));
  return res.json({ message: '삭제 되었습니다.' });
});

// Board posts & comments
app.get('/posts', (req, res) => res.json({ content: posts }));
app.post('/posts', (req, res) => {
  const body = req.body;
  const newPost = { postId: postId++, ...body };
  posts.unshift(newPost);
  return res.json(newPost);
});
app.get('/posts/:articleId', (req, res) => {
  const p = posts.find(p => p.postId === Number(req.params.articleId));
  if (!p) return res.status(404).json({ message: 'Post not found' });
  return res.json(p);
});
app.delete('/posts/:articleId', (req, res) => {
  posts = posts.filter(p => p.postId !== Number(req.params.articleId));
  return res.status(204).end();
});
app.get('/posts/:articleId/comments', (req, res) => {
  const articleId = Number(req.params.articleId);
  return res.json(comments.filter(c => c.postId === articleId));
});
app.post('/posts/:articleId/comments', (req, res) => {
  const articleId = Number(req.params.articleId);
  const body = req.body;
  const newComment = { commentId: commentId++, postId: articleId, writerId: 1, writerNickname: '정호아빠', content: body.content, createdAt: new Date().toISOString(), parentCommentId: null };
  comments.push(newComment);
  return res.json(newComment);
});
app.delete('/comments/:commentId', (req, res) => {
  comments = comments.filter(c => c.commentId !== Number(req.params.commentId));
  return res.status(204).end();
});

// 정의되지 않은 경로는 404 처리
app.use((req, res) => {
  return res.status(404).json({ message: 'mocking 환경에서는 지원하지 않습니다.', path: req.path });
});

const port = process.env.PORT || 4000;

// app.listen(port, () => {
//   console.log(`Mock server listening on port ${port}`);
// });

module.exports = serverless(app);