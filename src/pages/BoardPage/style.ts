import styled from '@emotion/styled';
import theme from '../../styles/theme';

export const Container = styled.div`
  width: 360px;
  height: 100vh;
  background-color: ${theme.color.primary[100]};
`;

export const AppBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const ArticleList = styled.div`
  overflow-y: scroll;
`;
