import { ReactNode } from 'react';

import * as s from './DiaryTyphography.styles';

import { DiaryTyphographyStyles } from './DiaryTyphography.type';

interface DiaryTyphographyProps extends DiaryTyphographyStyles {
  children: ReactNode;
}

const DiaryTyphography = ({
  children,
  color = 'black',
  shade = '900',
  size = 'md',
}: DiaryTyphographyProps) => {
  return (
    <s.DiaryTyphography color={color} shade={shade} size={size}>
      {children}
    </s.DiaryTyphography>
  );
};

export default DiaryTyphography;
