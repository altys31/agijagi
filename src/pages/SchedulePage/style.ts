import styled from '@emotion/styled';
import theme from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 769px) {
    width: 360px;
  }
  height: calc(var(--vh) * 100);
  max-height: 100%;
  background-color: ${theme.color.primary[100]};
`;

export const Main = styled.main`
  width: 360px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: scroll;
  padding: 0 1rem;
`;

export const ScheduleHeader = styled.div`
  @media (min-width: 769px) {
    width: 320px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const ScheduleList = styled.div`
  @media (min-width: 769px) {
    width: 320px;
  }
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1 1 auto;
  overflow-y: scroll;
`;
