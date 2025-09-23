import styled from '@emotion/styled';
import theme from '../../../../../styles/theme';

export const Container = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  user-select: none;

  :active {
    background-color: ${theme.color.primary[300]};
    transform: scale(0.975);
  }
`;

export const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;
