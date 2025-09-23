import { ReactNode } from 'react';

import Typhography from '../../../common/Typography';

import * as s from './Group.style';

interface DateProps {
  children: ReactNode;
  title: ReactNode;
}

const Group = ({ children, title }: DateProps) => {
  return (
    <div>
      <Typhography size="sm">{title}</Typhography>
      <s.Body>{children}</s.Body>
    </div>
  );
};

export default Group;
