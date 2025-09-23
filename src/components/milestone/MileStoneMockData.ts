interface DevelopmentStage {
  title: string;
  MilestoneDetails: MilestoneDetail[];
}

interface MilestoneDetail {
  milestoneId: number;
  content: string;
  requiredAmount: number;
  currentAmount: number;
  date: null | string;
}

export const babyDevelopmentData: DevelopmentStage[] = [
  {
    title: '움직임 / 신체발달',
    MilestoneDetails: [
      {
        milestoneId: 1,
        content: '손에 장난감을 주면 그것을 쥔다',
        requiredAmount: 8,
        currentAmount: 5,
        date: null,
      },
      {
        milestoneId: 2,
        content: '팔을 사용하여 장난감을 흔든다',
        requiredAmount: 8,
        currentAmount: 2,
        date: null,
      },
    ],
  },
  {
    title: '언어 / 의사소통',
    MilestoneDetails: [
      {
        milestoneId: 3,
        content: '소리가 나는 쪽을 향해 고개를 돌린다',
        requiredAmount: 8,
        currentAmount: 4,
        date: null
      },
      {
        milestoneId: 4,
        content: '아이에게 말을 걸면 대답하여 소리를 낸다',
        requiredAmount: 8,
        currentAmount: 0,
        date: null
      },
    ],
  },
  {
    title: '인지',
    MilestoneDetails: [
      {
        milestoneId: 5,
        content: '장난감이 숨겨진 장소를 기억한다',
        requiredAmount: 8,
        currentAmount: 0,
        date: null,
      },
      {
        milestoneId: 6,
        content: '다양한 모양의 블록을 맞추어 본다',
        requiredAmount: 8,
        currentAmount: 0,
        date: null,
      },
    ],
  },
  {
    title: '사회성',
    MilestoneDetails: [
      {
        milestoneId: 7,
        content: '다른 아이들과 함께 놀이를 시도한다',
        requiredAmount: 8,
        currentAmount: 1,
        date: null,
      },
      {
        milestoneId: 8,
        content: '감정을 표현하기 위해 표정이나 몸짓을 사용한다',
        requiredAmount: 8,
        currentAmount: 3,
        date: null,
      },
    ],
  },
];
