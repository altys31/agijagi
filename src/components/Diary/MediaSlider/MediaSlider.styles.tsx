import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';

export const InnerBox = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    border-radius: 1rem;
    scrollbar-width: none;
    cursor: grab;
    &::-webkit-scrollbar {
      display: none;
    }
  `
);

export const SlideWrapper = styled.div(
  () => css`
    display: flex;
    width: 100%;
    max-width: 500px;
    scroll-snap-align: center;
  `
);

export const MediaBox = styled.div(
  () => css`
    flex-shrink: 0;
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
    overflow: hidden;
    background-color: #f0f0f0;
    position: relative;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  `
);

export const Container = styled.div(
  () => css`
    padding: 1.25rem 0.5rem 1.25rem 0.5rem;
    max-width: 500px;
    max-height: 500px;
    border-radius: 1rem;
  `
);

export const IndexLabel = styled.div(
  () => css`
    position: absolute;
    width: 40px;
    height: 20px;
    background-color: ${theme.color.primary[200]};
    left: 4%;
    top: 4%;
    border-radius: 1rem;
    text-align: center;
  `
);

export const DelIconDiv = styled.div(
  () => css`
    position: absolute;
    width: 30px;
    height: 30px;
    right: 3%;
    top: 3%;
    z-index: 5;
    cursor: pointer;
    color: #000;
    border-radius: 0.5rem;
    opacity: 100%;
    :hover {
      color: ${theme.color.greyScale[900]};
    }
  `
);

export const DelIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
