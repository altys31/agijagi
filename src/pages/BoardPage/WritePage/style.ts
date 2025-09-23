import styled from '@emotion/styled';

import theme from '../../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(var(--vh) * 100);
  background-color: ${theme.color.primary[100]};
`;

export const Main = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: scroll;
  padding: 0 1rem 1rem 1rem;
`;

export const Title = styled.input`
  margin: 0.75rem 0;
  padding: 0.75rem;
  border: 0;
  border-radius: 1rem;
  background-color: ${theme.color.primary[300]};
`;

export const Body = styled.textarea`
  flex: 1 1 auto;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border: 0;
  border-radius: 1rem;
  background-color: ${theme.color.primary[300]};
`;
