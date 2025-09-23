import styled from '@emotion/styled';

import theme from '../../../styles/theme';

export const Wrapper = styled.div`
  box-sizing: border-box;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background-color: ${theme.color.danger.A100};
  text-align: center;
`;
