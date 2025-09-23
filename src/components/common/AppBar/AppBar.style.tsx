import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const AppBar = styled.div<{ color: string; height: string }>(
  (props) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: ${props.height};
    padding: 0 0.75rem;
    background-color: ${props.color};
  `
);

export const Cloud = styled.div`
  overflow: hidden;
  margin-top: -12px;

  svg {
    width: 600px;
    min-width: 100%;
  }
`;

export const Container = styled.header`
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow-x: hidden;
`;
