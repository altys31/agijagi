import { http, HttpResponse } from "msw";
import { HeightWeightInfoProps } from "../apis/milestone";
import { babyDevelopmentData } from "../components/milestone/MileStoneMockData";

const reportsDataList = [
  { id: 4, month: 9, createAt: "2025-09-15" },
  { id: 3, month: 6, createAt: "2025-06-15" },
  { id: 2, month: 4, createAt: "2025-04-20" },
  { id: 1, month: 2, createAt: "2025-02-13" },
];

const graphData = [
  { day: 1, weight: 3.5, standardWeight: 3.2, height: 50 },
  { day: 27, weight: 3.8, standardWeight: 3.4, height: 55 },
  { day: 60, weight: 4.2, standardWeight: 3.9, height: 60 },
  { day: 120, weight: 6.1, standardWeight: 5.7, height: 70 },
  { day: 180, weight: 7.6, standardWeight: 7.1, height: 80 },
  { day: 270, weight: 8.9, standardWeight: 8.3, height: 90 }
]
const DevelopmentData = babyDevelopmentData;

const reportData = [
  {
    id: 1,
    currWeight: 4.2,
    content:
      "태어난 이후 꾸준히 체중이 증가하며 건강하게 성장하고 있습니다. 생후 초반 표준 체중을 안정적으로 웃돌며 현재 4.2kg까지 성장하였으며, 수유와 수면 패턴도 안정적입니다. 전반적으로 발달 단계에 맞춘 건강한 성장을 보이고 있습니다.",
    growthDegree: 90,
    maxDegree: 100,
    createdAt: "2025-02-13",
    graphData: [
      { day: 1, weight: 3.5, standardWeight: 3.2 },
      { day: 27, weight: 3.8, standardWeight: 3.4 },
      { day: 60, weight: 4.2, standardWeight: 3.9 }
    ]
  },
   {
    id: 2,
    currWeight: 6.1,
    content:
      "생후 약 4개월이 된 현재 아기는 꾸준한 체중 증가와 활발한 움직임을 보이며 건강하게 성장하고 있습니다. 표준 체중을 안정적으로 웃돌며 현재 6.1kg까지 도달했으며, 고개 가누기와 옹알이 등 발달 지표에서도 또래 평균 이상을 보이고 있습니다. 수유 간격과 수면 패턴도 점차 규칙적으로 자리잡고 있습니다.",
    growthDegree: 92,
    maxDegree: 100,
    createdAt: "2025-04-20",
    graphData: [
      { day: 1, weight: 3.5, standardWeight: 3.2 },
      { day: 27, weight: 3.8, standardWeight: 3.4 },
      { day: 60, weight: 4.2, standardWeight: 3.9 },
      { day: 120, weight: 6.1, standardWeight: 5.7 }
    ]
  },
     {
    id: 3,
    currWeight: 7.6,
    content:
      "생후 6개월이 된 현재 아기는 안정적으로 앉으려는 시도와 뒤집기 등 활발한 움직임을 보이며 건강하게 성장하고 있습니다. 체중은 7.6kg으로 또래 평균을 상회하며 이유식 초기단계를 시작해 다양한 식감을 익히고 있습니다. 수면 패턴도 규칙적이고 낮잠과 밤잠의 구분이 점차 뚜렷해지고 있습니다.",
    growthDegree: 93,
    maxDegree: 100,
    createdAt: "2025-06-15",
    graphData: [
      { day: 1, weight: 3.5, standardWeight: 3.2 },
      { day: 27, weight: 3.8, standardWeight: 3.4 },
      { day: 60, weight: 4.2, standardWeight: 3.9 },
      { day: 120, weight: 6.1, standardWeight: 5.7 },
      { day: 180, weight: 7.6, standardWeight: 7.1 }
    ]
  },
  {
    id: 4,
    currWeight: 8.9,
    content:
      "생후 9개월에 접어든 아기는 기어다니기와 붙잡고 서기를 시도하며 활발한 활동성을 보이고 있습니다. 체중은 8.9kg으로 또래 평균을 안정적으로 웃돌고 있으며, 다양한 이유식 식단과 손가락으로 음식을 잡아먹는 등 소근육 발달도 활발히 이루어지고 있습니다. 낯가림과 애착 행동도 나타나며 정서 발달이 빠르게 진행 중입니다.",
    growthDegree: 94,
    maxDegree: 100,
    createdAt: "2025-09-15",
    graphData: [
      { day: 1, weight: 3.5, standardWeight: 3.2 },
      { day: 27, weight: 3.8, standardWeight: 3.4 },
      { day: 60, weight: 4.2, standardWeight: 3.9 },
      { day: 120, weight: 6.1, standardWeight: 5.7 },
      { day: 180, weight: 7.6, standardWeight: 7.1 },
      { day: 270, weight: 8.9, standardWeight: 8.3 }
    ]
  }
];


export const reportHandler = [
  // 보고서 리스트 조회
  http.get('https://api.password926.site/children/:childId/reports', () => {
    return HttpResponse.json(reportsDataList);
  }),

  http.get('https://api.password926.site/children/:childId/reports/:reportId', (req) => {
    const { childId, reportId } = req.params;
    const report = reportData.find((r) => r.id === Number(reportId));
    if (report) {
      return HttpResponse.json(report);
    }
    return HttpResponse.json({ error: 'Report not found' }, { status: 404 });
  }),

  // 아이 마일스톤 관련 모킹
  http.get('https://api.password926.site/children/:childId/growth', () => {
    const growthData = graphData.map((data) => {
      return { weight: data.weight, height: data.height, month: Math.floor(data.day / 30) };
    });

    return HttpResponse.json(growthData as HeightWeightInfoProps[]);
  }),

  http.get('https://api.password926.site/children/:childId/milestones', (req) => {
    const url = new URL(req.request.url);
    const month = url.searchParams.get('month');
    console.log(DevelopmentData);
    return HttpResponse.json(DevelopmentData);
  }),
  
]