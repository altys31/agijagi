import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Border = styled.div<{
  image: string;
  $color: string;
  height: string;
}>(
  (props) => css`
    flex-shrink: 0;
    height: ${props.height};
    background-color: ${props.$color};
    mask-image: url(${props.image});
  `
);

export const Body = styled.div<{ $color: string }>(
  (props) => css`
    flex: 1 1 auto;
    overflow-y: scroll;
    padding: 0.625rem;
    box-sizing: border-box;
    background-color: ${props.$color};
  `
);
