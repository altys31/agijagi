import styled from '@emotion/styled';
import theme from '../../../../styles/theme';

export const Container = styled.div`
  position: relative;
  top: 0;
  overflow: scroll;
  height: 100%;
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: ${theme.color.primary[100]};
  font-size: 0.875rem;
`;
