import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const TextBackground = styled.div(
  () => css`
    width: 95%;
    padding: 0px 1rem 0px 1rem;
    font-size: 18px;
    line-height: 1.7; /* 줄 간격 설정 */
    background: linear-gradient(orange 2px, white 2px) 0 0 / 100% 34px; /* 점선 줄 간격 */
    background-repeat: repeat-y;
    color: #333;
    white-space: pre-wrap; /* 줄바꿈을 허용 */
    transform: scaleY(-1);
    border-radius: 10px;
  `
);

export const TextBox = styled.div(
  () => css`
    transform: scaleY(-1);
  `
);
