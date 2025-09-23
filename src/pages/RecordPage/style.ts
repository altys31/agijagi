import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: scroll;
`;

export const RecordMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0 0.5rem;
`;

export const RecordList = styled.div`
  flex: 1 1 auto;
  overflow-y: scroll;
`;
