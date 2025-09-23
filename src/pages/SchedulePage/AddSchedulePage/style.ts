import styled from '@emotion/styled';

import theme from '../../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(var(--vh) * 100);
  background-color: ${theme.color.primary[100]};
`;

export const Main = styled.main`
  padding: 0 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const TimerPickerWrapper = styled.div`
  padding: 0.75rem 0;
  text-align: right;
  line-height: 0;
`;

export const Icon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

export const IconButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;
