import { ReactNode, useContext, useEffect, useRef } from 'react';

import { TabContext } from '../Tab';

import * as s from './Item.style';

interface ItemProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
}

const Item = ({ children, value, disabled = false }: ItemProps) => {
  const tabContext = useContext(TabContext);
  const itemRef = useRef<HTMLDivElement>(null);

  if (tabContext === undefined) {
    throw new Error('TabContext is undefined.');
  }

  const handleClick = () => {
    if (!itemRef.current || disabled) {
      return;
    }

    tabContext.setSelected(itemRef.current, value);
  };

  useEffect(() => {
    if (!itemRef.current || !tabContext.init || tabContext.selected !== value) {
      return;
    }

    tabContext.setSelected(itemRef.current, value);
  }, [itemRef, tabContext, value]);

  return (
    <s.Item
      ref={itemRef}
      selected={tabContext.selected === value}
      color={tabContext.color}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </s.Item>
  );
};

export default Item;
