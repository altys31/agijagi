import { http, HttpResponse } from "msw";
import babyVideo from '../assets/diary/babyVideo1.mp4';
import babyPic1 from '../assets/diary/babyPic1.jpg';
import babyPic2 from '../assets/diary/babyPic2.webp';
import babyPic3 from '../assets/diary/babyPic3.webp';
import moment from "moment";
import { DiaryResponse } from "../types/diary";


// ArrayBuffer를 Data URL로 변환하는 유틸 함수
const arrayBufferToDataUrl = (buffer: ArrayBuffer, mimeType: string) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `data:${mimeType};base64,${base64}`;
};

// FormData 처리 함수
const handleFormData = async (formData: FormData) => {

  const childIdValue = formData.get('childId');
  const memberIdValue = formData.get('memberId');
  const contentValue = formData.get('content');
  const wroteAtValue = formData.get('wroteAt');

  const childId = typeof childIdValue === 'string' ? Number(childIdValue) : 0;
  const memberId = typeof memberIdValue === 'string' ? Number(memberIdValue) : 0;
  const content = typeof contentValue === 'string' ? contentValue : '';
  const wroteAt = typeof wroteAtValue === 'string' ? wroteAtValue : moment().toISOString();

  const mediaFiles = formData.getAll('mediaList') as File[]; 

  const mediaUrls: string[] = [];
  const mediaTypes: ("image" | "video")[] = [];

  for (let i = 0; i < mediaFiles.length; i++) {
    const file = mediaFiles[i];
    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      const mime = file.type || 'application/octet-stream';
      const dataUrl = arrayBufferToDataUrl(buffer, mime);

      mediaUrls.push(dataUrl);
      mediaTypes.push(mime.startsWith('image/') ? 'image' : 'video');
    }
  }

  return { childId, memberId, content, wroteAt, mediaUrls, mediaTypes };
};


let idCounter = 4;

const diaryData : DiaryResponse[] = [
  {
    id: 1,
    childId: 1,
    memberId: 1,
    content: "오늘 아가는 아기 침대에서 귀엽게 옹알이하며 놀다가 지쳐버렸어요. 작은 손발을 흔들며 웃는 모습이 너무 사랑스러워 한참을 바라봤답니다. 그렇게 놀던 아기가 이제 포근한 이불 위에서 천사처럼 깊이 잠들었어요. 하루하루가 이렇게 소중하고 감사하네요.",
    createdAt: moment().toISOString(),
    wroteAt: moment().subtract(2, 'days').toISOString(),
    mediaUrls: [babyVideo, babyPic2],
    mediaTypes: ["video", "image"],
  },
  {
    id: 2,
    childId: 1,
    memberId: 1,
    content: "오늘 우리 아가가 처음으로 헤드폰을 썼는데 너무 좋아했어요! 음악에 맞춰 팔을 벌리고 웃는 모습이 정말 사랑스러웠답니다.이렇게 순수한 웃음 덕분에 하루가 행복해요~.",
    createdAt: moment().toISOString(),
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
];

export const diaryHandler = [
  http.get(`https://api.password926.site/diaries?childId=${1}`, () => {
    return HttpResponse.json(diaryData);
  }),


// POST 핸들러 (data URL 방식)
http.post('https://api.password926.site/diaries', async (req) => {
  
  const formResult = await handleFormData(await req.request.formData());
  const newDiary: DiaryResponse = {
    id: ++idCounter,
    createdAt: moment().toISOString(),
    childId: formResult.childId,
    memberId: formResult.memberId,
    content: formResult.content,
    wroteAt: formResult.wroteAt,
    mediaUrls: formResult.mediaUrls,
    mediaTypes: formResult.mediaTypes,
  };
  
  diaryData.push(newDiary);
  console.log(newDiary)
  return HttpResponse.json(newDiary, { status: 200 });
}),

  http.patch('https://api.password926.site/diaries/:diaryId', async (req) => {
  
    const { diaryId } = req.params;
    const diary = diaryData.find(d => d.id === Number(diaryId)) as DiaryResponse;
    const formResult = await handleFormData(await req.request.formData());
    
    const newDiary: DiaryResponse = {
      id: Number(diaryId),
      createdAt: diary?.createdAt || moment().toISOString(),
      childId: diary.childId,
      memberId: diary.memberId,
      content: formResult.content,
      wroteAt: diary.wroteAt,
      mediaUrls: formResult.mediaUrls,
      mediaTypes: formResult.mediaTypes,
    };
  
  diaryData.splice(diaryData.findIndex(d => d.id === Number(diaryId)), 1, newDiary);
  return HttpResponse.json(newDiary, { status: 200 });
  }),

  http.delete('https://api.password926.site/diaries/:diaryId', async (req) => {
    const { diaryId } = req.params;
    diaryData.splice(diaryData.findIndex(d => d.id === Number(diaryId)), 1);
    return HttpResponse.json({ message: '삭제 되었습니다.' });
  })
];