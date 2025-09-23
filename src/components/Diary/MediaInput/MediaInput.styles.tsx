import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '../../../styles/theme';

export const InputBox = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${theme.color.primary[200]};
    max-width: 500px;
    max-height: 500px;
    aspect-ratio: 1;
  `
);

export const Label = styled.label<{}>(
  () => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    min-width: 280px;
    min-height: 280px;

    cursor: pointer;
  `
);

export const CameraIcon = styled.div(
  () => css`
    width: 48px;
    height: 48px;
  `
);

export const Popup = styled.div<{ xPos: number; yPos: number }>(
  (props) => css`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    min-width: 180px;
    min-height: 75px;
    transition: all 0.2s;
    background-color: ${theme.color.greyScale[50]};
    border-radius: 0.5rem;
    left: ${props.xPos}px;
    top: ${props.yPos}px;
  `
);

export const PopupItem = styled.label(
  () => css`
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding: 0.2rem;
    border-radius: 0.3rem;
    :hover {
      background-color: ${theme.color.greyScale[500]};
    }
  `
);

export const InvisibleInput = styled.input(
  () => css`
    display: none;
  `
);
