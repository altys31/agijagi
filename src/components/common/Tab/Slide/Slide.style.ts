import { css } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '../../../../styles/theme';

import { Palette } from '../../../../types/theme';

export const Slide = styled.div<{
  color: Palette;
}>(
  (props) => css`
    position: absolute;
    right: 0;
    bottom: 0;
    height: 12.5%;
    padding: 0 !important;
    border-radius: 1rem;
    background-color: ${theme.color[props.color][700]};
    box-sizing: border-box;
    transform-origin: 0 0;
    transition: all 0.2s ease;
    content: '';
  `
);
