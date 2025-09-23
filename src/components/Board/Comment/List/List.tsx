import { ReactNode } from 'react';

import * as s from './List.style';

interface ListProps {
  children: ReactNode;
  commentCount: number;
}

const List = ({ children, commentCount }: ListProps) => {
  return (
    <s.Container>
      {!!commentCount && <s.Header>댓글 {commentCount}개</s.Header>}
      {children}
    </s.Container>
  );
};

export default List;
