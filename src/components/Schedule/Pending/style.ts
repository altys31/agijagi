import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotate = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Pending = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 0.125rem;
  border: 0.125rem solid #fff;
  border-top: 0.125rem solid transparent;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
