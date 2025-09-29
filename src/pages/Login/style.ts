import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../styles/theme';

export const Container = styled.div(
  () => css`
    position: relative; 
    height: calc(var(--vh) * 100);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
  `
);

export const Moon = styled.div<{
  width: number;
  height: number;
  ratio: number;
  level: number;
  loginMode: boolean;
}>(
  (props) => css`
    position: absolute;
    width: ${props.width * 2}px;
    height: ${props.width * 2}px;
    border-radius: 56% 44% 53% 47% / 50% 48% 52% 50%;
    background-color: ${theme.color.primary[300]};
    ${props.loginMode
      ? ''
      : 'box-shadow: rgba(255, 255, 255, 0.75) 0px 12px 42px 0px'};
    top: ${props.width * -2 + props.height * 0.5}px;
    left: ${props.width * -0.45}px;
    transition: all 0.5s;
    transform: translate(0, ${props.loginMode ? props.height * -0.10 : 0}px)
      rotate(${props.loginMode ? 0 : props.level * 30}deg);
    z-index: 0;
  `
);

export const LoginContainer = styled.div<{ width: number; loginMode: boolean }>(
  (props) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    width: 85%;
    margin: 0% 0% 15vh 0%;
    gap: 18px;
    z-index: 10;
    transition: all 0.75s;
    transform: translate(${props.loginMode ? props.width * -1 : 0}px, 0);
  `
);

export const Logo = styled.img<{ height: number; loginMode: boolean }>(
  (props) => css`
    position: absolute;
    height: 33%;
    aspect-ratio: 1;
    transition: all 1.25s;
    transform: translate(
      0,
      ${props.loginMode ? props.height * -0.65 : props.height * -1}px
    );
    opacity: ${props.loginMode ? 1 : 0};
  `
);

export const FormContainer = styled.div<{ width: number; loginMode: boolean }>(
  (props) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    width: 85%;
    margin: 0% 0% 13vh 0%;
    gap: 32px;
    z-index: 10;
    transition: all 0.75s;
    transform: translate(${props.loginMode ? 0 : props.width}px, 0);
  `
);

export const ModalBackground = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.color.primary[50]};
  margin: 1rem;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 0.5rem;
  gap: 1rem;
`;

export const PatternContainer = styled.div(
  () => css`
    position: relative;
    width: 100%;
    height: 100%;
  `
);

export const Pattern1 = styled.div<{ ratio: number }>(
  (props) => css`
    position: absolute;
    width: ${100 * props.ratio}px;
    height: ${100 * props.ratio}px;
    border-radius: 57% 43% 58% 42% / 58% 41% 59% 42%;
    background-color: ${theme.color.primary[400]};
    top: 80%;
    left: 62%;
  `
);
export const Pattern2 = styled.div<{ ratio: number }>(
  (props) => css`
    position: absolute;
    width: ${105 * props.ratio}px;
    height: ${105 * props.ratio}px;
    border-radius: 70% 30% 65% 35% / 36% 61% 39% 64%;
    background-color: ${theme.color.primary[400]};
    top: 42%;
    left: 55%;
  `
);
export const Pattern3 = styled.div<{ ratio: number }>(
  (props) => css`
    position: absolute;
    width: ${120 * props.ratio}px;
    height: ${120 * props.ratio}px;
    border-radius: 49% 51% 39% 61% / 61% 50% 50% 39%;
    background-color: ${theme.color.primary[400]};
    top: 72%;
    left: 20%;
  `
);

export const Pattern4 = styled.div<{ ratio: number }>(
  (props) => css`
    position: absolute;
    width: ${150 * props.ratio}px;
    height: ${150 * props.ratio}px;
    border-radius: 55% 45% 58% 42% / 48% 51% 49% 52%;
    background-color: ${theme.color.primary[400]};
    top: 60%;
    left: 40%;
  `
);

export const Pattern5 = styled.div<{ ratio: number }>(
  (props) => css`
    position: absolute;
    width: ${150 * props.ratio}px;
    height: ${150 * props.ratio}px;
    border-radius: 100rem;
    background-color: ${theme.color.primary[400]};
    top: 36%;
    left: 24%;
  `
);

export const Pattern6 = styled.div<{ ratio: number }>(
  (props) => css`
    position: absolute;
    width: ${110 * props.ratio}px;
    height: ${110 * props.ratio}px;
    border-radius: 56% 44% 53% 47% / 50% 48% 52% 50%;
    background-color: ${theme.color.primary[400]};
    top: 60%;
    left: 76%;
  `
);

export const BackButton = styled.div(
  () => css`
    position: absolute;
    width: 24px;
    height: 24px;
    padding: 0.2rem;
    color: #fff;
    background-color: ${theme.color.primary[400]};
    border-radius: 50%;
    transition: all 0.75s;
    left: 75%;
    top: 2%;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  `
);
