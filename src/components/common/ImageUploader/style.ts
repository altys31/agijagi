import styled from '@emotion/styled';

import theme from '../../../styles/theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${theme.color.primary[200]};
`;

export const Preview = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1 1 auto;
  overflow-x: scroll;
  width: 100%;

  > * {
    flex-shrink: 0;
  }
`;
