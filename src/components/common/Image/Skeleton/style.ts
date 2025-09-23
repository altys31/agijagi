import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '../../../../styles/theme';

const skeleton = keyframes({
  from: {
    backgroundPosition: '-200% 0',
  },

  to: {
    backgroundPosition: '200% 0',
  },
});

export const Container = styled.div<{ done: boolean }>(
  (props) => css`
    position: absolute;
    inset: 0;
    z-index: 10;
    background: linear-gradient(
      90deg,
      ${theme.color.greyScale[800]} 0%,
      ${theme.color.greyScale[900]} 50%,
      ${theme.color.greyScale[800]} 100%
    );
    background-size: 200% 100%;
    animation: ${skeleton} 2s linear 0s infinite;
    transition: all 0.15s ease;

    ${props.done &&
    css`
      opacity: 0;
    `}
  `
);
