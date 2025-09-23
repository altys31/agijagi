import { css } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '../../../../styles/theme';

import { Palette } from '../../../../types/theme';

export const Item = styled.div<{
  selected: boolean;
  color: Palette;
  disabled: boolean;
}>(
  (props) => css`
    flex: 1 1 0;
    overflow: hidden;
    position: relative;
    height: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    width: 100px;
    transition: color 0.2s ease;
    user-select: none;

    ${!props.disabled &&
    css`
      cursor: pointer;
    `}

    ${props.disabled
      ? css`
          color: ${theme.color.greyScale[500]};
        `
      : props.selected
      ? css`
          color: ${theme.color[props.color][900]};
        `
      : css`
          color: ${theme.color.greyScale[700]};
        `}
  `
);
