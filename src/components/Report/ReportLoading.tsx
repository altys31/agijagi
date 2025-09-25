import React from 'react';
import styled from '@emotion/styled';

import babyFlowerImage from '../../assets/images/logo4.png';
import theme from '../../styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${theme.color.tertiary[50]};
  width: 300px;
  height: 300px;
  border-radius: 10px;
  position: relative;
`;

const BouncingImage = styled.img`
  width: 150px;
  height: 150px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
`;

const LoadingText = styled.span`
  margin-top: 20px;
  font-size: 16px;
`;

function Loading() {
  return (
    <Container>
      <BouncingImage src={babyFlowerImage} />
      <LoadingText>성장 분석 보고서를 생성중입니다 !</LoadingText>
    </Container>
  );
}

export default Loading;
