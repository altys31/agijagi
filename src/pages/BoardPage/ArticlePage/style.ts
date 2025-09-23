import styled from '@emotion/styled';

import theme from '../../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(var(--vh) * 100);
  background-color: ${theme.color.primary[300]};
`;

export const CommentList = styled.div`
  flex: 1 1;
  overflow-y: scroll;
`;
