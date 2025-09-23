import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import babyFlowerImage from '../../assets/images/logo4.png';
import theme from '../../styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

const LoadingText = styled.span<{ fade: boolean }>`
  margin-top: 20px;
  height: 50px;
  font-size: ${theme.typography.fontSize.md};
  text-align: center;
  opacity: ${(props) => (props.fade ? 0 : 1)};
  transition: opacity 1s ease-in-out;
`;

const Loading = () => {
  const [loadingText, setLoadingText] = useState<string>(
    '작성된 일기를 기반으로\n동화를 생성중입니다 !'
  );
  const [fade, setFade] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // 페이드 아웃 트리거
      setTimeout(() => {
        setLoadingText((prevText) =>
          prevText === '작성된 일기를 기반으로\n동화를 생성중입니다 !'
            ? '잠시만 기다려 주세요.'
            : '작성된 일기를 기반으로\n동화를 생성중입니다 !'
        );
        setFade(false); // 페이드 인 트리거
      }, 1000); // 페이드 아웃 시간(1초) 후 텍스트 변경
    }, 4000); // 텍스트 전환 주기

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  return (
    <Container>
      <BouncingImage src={babyFlowerImage} />
      <LoadingText fade={fade}>
        {loadingText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </LoadingText>
    </Container>
  );
};

export default Loading;
