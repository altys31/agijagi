import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  0% {
    transform: translateX(-1rem);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: inherit;
  animation: ${fadeIn} 0.2s ease;
  transition: all 0.2s ease;
  user-select: none;

  :active {
    background-color: rgba(0, 0, 0, 0.066);
  }
`;

export const IconWrapper = styled.div<{ bacgkroundColor: string }>(
  (props) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background-color: ${props.bacgkroundColor};
  `
);

export const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;
