import { ReactNode } from 'react';

import Typhography from '../../Typography';

import * as s from './Title.css';

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <s.Title>
      <Typhography size="xl" weight="bold">
        {children}
      </Typhography>
    </s.Title>
  );
};

export default Title;
