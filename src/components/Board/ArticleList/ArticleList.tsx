import { ReactNode } from 'react';

interface ArticleListProps {
  children: ReactNode;
}

const ArticleList = ({ children }: ArticleListProps) => {
  return <div>{children}</div>;
};

export default ArticleList;
