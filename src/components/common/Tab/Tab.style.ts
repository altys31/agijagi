import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import { TabSize, TabStyles } from './Tab.types';

const sizeStyle: Record<TabSize, SerializedStyles> = {
  sm: css`
    min-height: 1.5rem;
    height: 1.5rem;
    font-size: 0.875rem;

    div {
      padding: 0 0.5rem;
    }
  `,
  md: css`
    min-height: 2rem;
    height: 2rem;
    font-size: 1rem;

    div {
      padding: 0 0.75rem;
    }
  `,
  lg: css`
    min-height: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;

    div {
      padding: 0 1rem;
    }
  `,
};

export const Tab = styled.div<TabStyles>(
  (props) => css`
    ${sizeStyle[props.size]};

    display: inline-flex;
    align-items: center;
    position: relative;

    ${props.fullWidth &&
    css`
      width: 100%;
    `}
  `
);
