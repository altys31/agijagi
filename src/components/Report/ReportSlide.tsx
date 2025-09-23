import styled from '@emotion/styled';
import theme from '../../styles/theme';
import TurtleImg from '../../assets/images/milestone/turtle.png';
import RabbitImg from '../../assets/images/milestone/rabbit.png';
import BoyImg from '../../assets/images/boy.png';
import GirlImg from '../../assets/images/girl.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.color.primary[900]};
  margin: 15px auto 20px;
`;

const SlideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: ${theme.color.greyScale[300]};
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const ProgressBar = styled.div<{ percentage: number }>`
  position: absolute;
  left: 0;
  height: 100%;
  background-color: ${theme.color.primary[600]};
  width: ${({ percentage }) => `${percentage}%`};
  border-radius: 10px 0 0 10px;
`;

const Thumb = styled.div<{ percentage: number }>`
  position: absolute;
  top: -18px;
  left: ${({ percentage }) => `calc(${percentage}% - 25px)`};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: 1.5px solid ${theme.color.primary[700]};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const BabyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Turtle = styled.img`
  width: 35px;
  height: 38px;
`;

const Rabbit = styled.img`
  width: 30px;
  margin-bottom: 5px;
`;

const Line = styled.hr`
  border: none;
  width: 90%;
  max-width: 700px;
  background-color: ${theme.color.greyScale[400]};
  height: 1px;
  margin: 10px auto 5px;
`;

interface BabyData {
  gender: string | undefined;
  image: string | undefined | null;
  growthStatus: number | undefined;
}

// 성장 상태에 따른 위치 비율 계산 함수
const calculatePercentage = (growthStatus: number | undefined) => {
  const clampedValue = Math.max(0, Math.min(10, growthStatus ?? 0));
  return (clampedValue / 10) * 100;
};

// 성장 상태에 따른 멘트
const growthStatusText = (growthStatus: number | undefined) => {
  if (growthStatus === undefined) {
    return '성장 상태를 확인할 수 없습니다.';
  }
  if (growthStatus <= 3) {
    return '또래 아이들 보다 성장이 느린 편입니다 !';
  } else if (growthStatus <= 7) {
    return '또래 아이들과 성장이 비슷합니다 !';
  } else {
    return '또래 아이들 보다 성장이 빠른 편입니다 !';
  }
};

// 컴포넌트
const ReportSlide = ({ gender, image, growthStatus }: BabyData) => {
  const percentage = calculatePercentage(growthStatus);
  const status = growthStatusText(growthStatus);

  return (
    <Wrapper>
      <Line></Line>
      <Header>{status}</Header>
      <SlideWrapper>
        <Turtle src={TurtleImg} />
        <SliderContainer>
          <ProgressBar percentage={percentage} />
          <Thumb percentage={percentage}>
            {image && <BabyImage src={image} alt="Baby" />}
            {!image && (
              <>
                {gender === '남아' && <BabyImage src={BoyImg} alt="Baby" />}
                {gender === '여아' && <BabyImage src={GirlImg} alt="Baby" />}
              </>
            )}
          </Thumb>
        </SliderContainer>
        <Rabbit src={RabbitImg} />
      </SlideWrapper>
      <Line></Line>
    </Wrapper>
  );
};

export default ReportSlide;
