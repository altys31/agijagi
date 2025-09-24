import styled from '@emotion/styled';

import CommonButton from '../../../components/common/Button';

import theme from '../../../styles/theme';

export const Alert = styled.div`
  @media (min-width: 769px) {
    width: 300px;
 
  }
  margin: 1rem;
  padding: 1rem;
  /* border: 0.1875rem solid ${theme.color.primary[700]}; */
  border-radius: 0.75rem;
  background-color: ${theme.color.primary[600]};
  color: #fff;
`;

export const Message = styled.div`
  min-width: 66vw;
  padding: 0.5rem 0 1rem;
  line-height: 150%;
  word-break: break-all;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 0.5rem;
`;

export const Button = styled(CommonButton)`
  padding: 0.375rem 0.5rem;
  background-color: ${theme.color.primary[50]};
  color: ${theme.color.greyScale[900]};
  font-size: 0.875rem;
`;
