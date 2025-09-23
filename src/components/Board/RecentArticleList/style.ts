import styled from '@emotion/styled';

export const ArticleListItem = styled.div`
  margin-top: -3.5rem;

  :first-of-type {
    margin-top: 0;
  }

  :not(:last-of-type) {
    > div {
      padding-bottom: 2rem;
    }
  }
`;
