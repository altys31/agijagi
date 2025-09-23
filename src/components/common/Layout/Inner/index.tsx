import { ReactNode } from 'react';

import * as s from './style';

interface InnerProps {
  children: ReactNode;
}

const Inner = ({ children }: InnerProps) => {
  return <s.Inner>{children}</s.Inner>;
};

export default Inner;
