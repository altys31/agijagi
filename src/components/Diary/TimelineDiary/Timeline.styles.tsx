import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../../styles/theme';

export const DateContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  `
);
export const Container = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `
);
export const DayContainer = styled.div(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
);

export const DateDiv = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid ${theme.color.primary[500]};
    padding: 0.33rem;
    border-radius: 1rem;
    background-color: ${theme.color.primary[50]};
    cursor: pointer;
  `
);
