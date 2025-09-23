import { ReactNode } from 'react';

import * as s from './Typhography.style';

import { TyphographyStyles } from './Typhography.types';

interface TyphographyProps extends TyphographyStyles {
  children: ReactNode;
}

const Typhography = ({
  children,
  color = 'black',
  shade = '900',
  size = 'md',
  weight = 'regular',
}: TyphographyProps) => {
  return (
    <s.Typhography color={color} shade={shade} size={size} weight={weight}>
      {children}
    </s.Typhography>
  );
};

export default Typhography;
