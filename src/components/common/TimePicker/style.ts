import styled from '@emotion/styled';

import theme from '../../../styles/theme';

export const Icon = styled.div`
  line-height: 0;

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${theme.color.primary[500]};
    transition: all 0.2s ease;
  }
`;

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  line-height: 0;
  cursor: pointer;
  user-select: none;

  :active {
    svg {
      filter: brightness(95%);
      transform: scale(0.9);
    }
  }
`;
