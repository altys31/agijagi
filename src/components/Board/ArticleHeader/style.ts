import styled from '@emotion/styled';

import theme from '../../../styles/theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  box-shadow: 0 0 0.25rem 0 ${theme.color.primary[900]};
  background-color: ${theme.color.primary[600]};
`;

export const Title = styled.div`
  flex: 1 1 auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.25rem;
`;

export const Menu = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 0.5rem;
`;

export const Icon = styled.div`
  flex-shrink: 0;
`;
