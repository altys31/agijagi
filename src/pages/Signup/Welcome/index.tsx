import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';
import Typhography from '../../../components/common/Typography';
import WelcomeImg from '../../../assets/images/adult.png';
import Button from '../../../components/common/Button';
import useModal from '../../../hooks/useModal';
import { InviteCodeModal } from '../../../components/Signup/InviteCodeModal/InviteCodeModal';
import { useNavigate } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vh;
  background-color: ${theme.color.primary[50]};
`;

export const BabyImg = styled.img`
  width: 50%;
  aspect-ratio: 1;
  max-width: 500px;
  max-height: 500px;
`;

export const Introduction = styled.div<{ animationKey: boolean }>(
  (props) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 3vh;
    transition: transform 1s cubic-bezier(0.11, 0.29, 0.18, 0.98);
    transform: translateX(${props.animationKey ? '0' : '100vw'});
  `
);

export const ButtonContainer = styled.div<{ animationKey: boolean }>(
  (props) => css`
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 3vh;
    text-align: center;
    transition: transform 0.75s cubic-bezier(0.11, 0.29, 0.18, 0.98);
    transform: translateY(${props.animationKey ? '0' : '100vh'});
  `
);

export const SkipButton = styled.div`
  color: ${theme.color.greyScale[500]};
  text-decoration: underline;
`;

export const Welcome = () => {
  const [initialRender, setInitialRender] = useState(false);
  const modal = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setInitialRender(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    modal.pop();
  };

  const handleModal = () => {
    modal.push({
      children: <InviteCodeModal />,
    });
  };

  return (
    <Container>
      <Introduction animationKey={initialRender}>
        <Typhography size="6xl" weight="bold">
          어서오세요!
        </Typhography>
        <BabyImg src={WelcomeImg} />
        <Typhography size="xl" weight="bold">
          다른 사람으로부터 전달받은
          <br />
          초대 코드가 있나요?
        </Typhography>
      </Introduction>

      <ButtonContainer animationKey={initialRender}>
        <Button size="md" fullWidth={true} onClick={handleModal}>
          <Typhography color="white">네 (초대코드 등록)</Typhography>
        </Button>
        <Button
          size="md"
          color="secondary"
          fullWidth={true}
          onClick={() => navigate('/familyform')}
        >
          <Typhography color="white">아니오 (패밀리 등록)</Typhography>
        </Button>
        <SkipButton onClick={() => navigate('/main')}>
          <Typhography color="greyScale" shade="500">
            건너뛰기
          </Typhography>
        </SkipButton>
      </ButtonContainer>
    </Container>
  );
};
