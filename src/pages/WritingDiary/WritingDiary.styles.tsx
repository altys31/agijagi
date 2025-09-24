import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../styles/theme';

export const Container = styled.div(
  () => css`
    background-color: ${theme.color.primary[100]};
    width: 100%;
    height: 100%;
    overflow-y: auto;
  `
);

export const ModalBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.primary[50]};

  @media (min-width: 769px) {
    /* 데스크탑 전용 스타일 */
    width: 360px;
  }

  gap: 1rem;
  margin: 1rem;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 0.5rem;
`;

export const DateContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  `
);

export const ContentContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 20;
  `
);

export const DayContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `
);

export const DiaryTextArea = styled.textarea(
  () => css`
    width: 80%;
    height: auto;
    min-height: 220px;
    overflow-y: auto;
    border-radius: 0.5rem;
    background-color: ${theme.color.primary[50]};
    border: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin: 1rem;
    padding: 1rem;
  `
);

export const BottomArrow = (
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
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export const SelectBoxDiv = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 0.5rem;
    border: 2px solid ${theme.color.greyScale[600]};
    padding: 0.2rem;
    cursor: pointer;
  `
);

export const Icon = styled.div(
  () => css`
    width: 24px;
    height: 24px;
  `
);
