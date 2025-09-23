import { css } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '../../../../styles/theme';
import { ColorShade } from '../../../../types/theme';

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  th,
  td {
    text-align: center;
  }
`;

export const Circle = styled.div<{ shade: ColorShade | undefined }>(
  (props) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    width: 1.75rem;
    margin: 0 auto;
    border-radius: 50%;
    background-color: ${props.shade !== undefined
      ? theme.color.primary[props.shade]
      : 'transparent'};
    transition: all 0.1s ease;
  `
);
