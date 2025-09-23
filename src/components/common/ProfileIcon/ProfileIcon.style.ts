import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '../../../styles/theme';

import { ProfileIconSize } from './ProfileIcon.types';

const sizeStyle: Record<ProfileIconSize, SerializedStyles> = {
  sm: css`
    width: 45px;
    height: 45px;
  `,
  md: css`
    width: 60px;
    height: 60px;
  `,
  lg: css`
    width: 90px;
    height: 90px;
  `,
};

export const ProfileIcon = styled.div<{
  size: ProfileIconSize;
}>(
  (props) => css`
    ${sizeStyle[props.size]}
    border-radius: 50%;
    border: 1px solid ${theme.color.greyScale[300]};
    img {
      width: 103%;
      height: 103%;
      object-fit: cover;
    }
    overflow: hidden;
    background-color: ${theme.color.greyScale[300]};
    cursor: pointer;
  `
);
