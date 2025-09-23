import { css } from '@emotion/react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';

import { ColorShade } from '../../../types/theme';
import {
  TyphographyColor,
  TyphographySize,
} from '../Typography/Typhography.types';

const sizeStyles: Record<TyphographySize, string> = {
  '6xs': `
    font-size: 0.125rem;
  `,
  '5xs': `
    font-size: 0.25rem;`,
  '4xs': `
    font-size: 0.375rem;`,
  '3xs': `
    font-size: 0.5rem;`,
  '2xs': `
    font-size: 0.625rem;`,
  xs: `
    font-size: 0.75rem`,
  sm: `
  font-size: 0.875rem`,
  md: `font-size: 1rem`,
  lg: `font-size: 1.125rem`,
  xl: `font-size: 1.250rem`,
  '2xl': `font-size: 1.375rem`,
  '3xl': `font-size: 1.5rem`,
  '4xl': `font-size: 1.625rem`,
  '5xl': `font-size: 1.75rem`,
  '6xl': `font-size: 1.875rem `,
  '7xl': `font-size: 2rem`,
};

export const DiaryTyphography = styled.div<{
  color: TyphographyColor;
  size: TyphographySize;
  shade: ColorShade;
}>(
  (props) => css`
    ${sizeStyles[props.size]};

    font-family: 'OmyuFont';

    color: ${props.color === 'white'
      ? '#fff'
      : props.color === 'black'
      ? '#000'
      : theme.color[props.color][props.shade]};
  `
);
