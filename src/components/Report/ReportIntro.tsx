import styled from '@emotion/styled';
import Typhography from '../common/Typography';
import ProfileIcon from '../common/ProfileIcon/ProfileIcon';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 700px) {
    max-width: 800px;
  }
`;

const IntroBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr;
  gap: 5px;
  padding: 10px 5px;
`;

const IntroImg = styled.div`
  display: flex;
  justify-content: center;
`;

const IntroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 10px;
`;

interface ReportIntroProps {
  weight: number | undefined;
  currentWeight: number | undefined;
}

const ReportIntro = ({weight, currentWeight} : ReportIntroProps) => {

  return (
    <Wrapper>
      <IntroBox>
        <IntroImg>
          <ProfileIcon size="md" />
        </IntroImg>
        <IntroText>
          <Typhography>출생 몸무게 : {weight} kg</Typhography>
          <Typhography color='primary' shade='800'>현재 몸무게 : {currentWeight} kg</Typhography>
        </IntroText>
      </IntroBox>
    </Wrapper>
  )
};

export default ReportIntro;