import styled from '@emotion/styled';
import theme from '../../styles/theme';

export const TitleContainer = styled.div`
  margin: 2rem 1rem 1rem 1rem;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color.primary[50]};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
