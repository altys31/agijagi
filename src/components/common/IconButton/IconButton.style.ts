import styled from '@emotion/styled';

import theme from '../../../styles/theme';

export const Container = styled.div`
  width: 2rem;
  height: 2rem;
  color: ${theme.color.greyScale[900]};
  transition: all 0.2s ease;
  cursor: pointer;

  :active {
    color: ${theme.color.greyScale[800]};
    transform: scale(0.9);
  }
`;
