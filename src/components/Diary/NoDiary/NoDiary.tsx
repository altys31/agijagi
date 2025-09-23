import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';
import Typhography from '../../common/Typography';
import Crying from '../../../assets/images/crying.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2rem;
`;

export const Img = styled.img`
  width: 75%;
  height: 75%;
  transform: translateX(5%);
`;

export const NoDiary = () => {
  return (
    <Container>
      <Img src={Crying} />
      <Typhography size="2xl" weight="bold">
        아직 작성된 일기가 없어요
      </Typhography>
    </Container>
  );
};
