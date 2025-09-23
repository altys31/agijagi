import styled from '@emotion/styled';

import theme from '../../../../styles/theme';

export const Container = styled.div`
  width: calc(100vw - 2rem);
  padding: 1rem;
  border-radius: 0.75rem;
  box-sizing: border-box;
  background-color: #fff;
`;

export const Icon = styled.div`
  text-align: center;
  line-height: 0;

  svg {
    width: 4rem;
    height: 4rem;
    fill: ${theme.color.primary[500]};
  }
`;

export const Time = styled.input`
  width: 7.5rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: ${theme.color.primary[100]};
`;

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 0;
`;

export const Tilde = styled.span`
  margin: 0 0.125rem;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;
