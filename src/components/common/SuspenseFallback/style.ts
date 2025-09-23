import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '../../../styles/theme';

const skeleton = keyframes`
  from {
    background-position: -200% 0;
  }

  to {
    background-position: 200% 0;
  }
`;

export const Container = styled.div`
  box-sizing: border-box;
`;

export const Suspense = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #0000 0%,
    ${theme.color.primary.A200}80 50%,
    #0000 100%
  );
  background-size: 200% 100%;
  border-radius: 0.75rem;
  animation: ${skeleton} 2s linear 0s infinite;
`;
