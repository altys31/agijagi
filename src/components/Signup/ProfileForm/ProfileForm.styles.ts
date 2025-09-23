import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '../../../styles/theme';

export const Container = styled.div<{ width: number; isNext: boolean }>(
  (props) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    width: 80%;
    margin: 0% 0% 18vh 0%;
    gap: 4vh;
    z-index: 10;
    transition: all 1s;
    transform: translate(${!props.isNext ? 0 : props.width * 1}px, 0);
  `
);

export const ProfileCircleWrapper = styled.label`
  display: flex;
  position: relative;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 2px solid ${theme.color.greyScale[400]};
  background-color: ${theme.color.greyScale[200]};
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const AddIconWrapper = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  left: 80%;
  top: 7%;
`;

export const InvisibleInput = styled.input`
  display: none;
`;
export const BackButton = styled.div(
  () => css`
    position: absolute;
    width: 24px;
    height: 24px;
    padding: 0.2rem;
    color: #fff;
    background-color: ${theme.color.primary[300]};
    border-radius: 50%;
    transition: all 0.75s;
    right: 120%;
    top: 2%;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  `
);
