import { forwardRef, useContext } from 'react';

import { TabContext } from '../Tab';

import * as s from './Slide.style';

const Slide = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const tabContext = useContext(TabContext);

  if (tabContext === undefined) {
    throw new Error('TabContext is undefined.');
  }

  return <s.Slide ref={ref} color={tabContext.color}></s.Slide>;
});

Slide.displayName = 'Slide';

export default Slide;
