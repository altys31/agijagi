import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';
import { NoDiary } from '../../../components/Diary/NoDiary/NoDiary';

export const TimelineContainer = styled.div<{ noDiary: boolean }>(
  (props) =>
    css`
      position: relative;
      padding: 0.25rem 1rem 0.25rem 1.25rem;
      margin-left: 0.75rem;
      margin-right: 1rem;
      margin-top: 2rem;
      border-left: ${props.noDiary ? 0 : 4}px dashed
        ${theme.color.tertiary[700]};
    `
);

export const CalendarOutterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
export const CalendarInnerContainer = styled.div`
  width: 85%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
`;

export const Circle = styled.div<{ noDiary: boolean }>(
  (props) => css`
    position: absolute;
    width: 1rem;
    height: 1rem;
    background-color: ${theme.color.tertiary[700]};
    border-radius: 100rem;
    left: -10px;
    top: -10px;
    visibility: ${props.noDiary ? 'hidden' : 'visible'};
  `
);

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ModalBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${theme.color.primary[50]};
  margin: 1rem;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 0.5rem;
`;

export const WriteIconBox = styled.div`
  position: fixed;
  width: 24px;
  height: 24px;
  padding: 0.75rem;
  bottom: 8%;
  right: 41.5%;
  background-color: ${theme.color.primary[400]};
  color: #fff;
  border-radius: 50rem;
  z-index: 30;
  cursor: pointer;
`;
export const CloseIconBox = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 8px;
  top: 8px;
`;

export const TapWrapper = styled.div`
  margin-top: 0.5rem;
`;

export const CloseIcon = (
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
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export const WriteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

export const IconBoxContainer = styled.div`
  position: relative;
  width: 360px;
  height: 0;
`;
