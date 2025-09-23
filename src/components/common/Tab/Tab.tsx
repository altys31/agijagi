import { createContext, ReactNode, useRef, useState } from 'react';

import { Palette } from '../../../types/theme';

import Slide from './Slide';

import * as s from './Tab.style';

import type { TabStyles } from './Tab.types';

interface TabProps
  extends Partial<TabStyles>,
    Omit<React.ComponentProps<'div'>, 'color' | 'onChange'> {
  children: ReactNode;
  selected: string;
  onChange?: (value: string) => void;
}

type TabChangeHandler = (itemRef: HTMLDivElement, selected: string) => void;

interface TabContextProps {
  selected: string;
  setSelected: TabChangeHandler;
  color: Palette;
  init: boolean;
}

export const TabContext = createContext<TabContextProps | undefined>(undefined);

const Tab = ({
  children,
  fullWidth = true,
  selected: initSelected,
  size = 'md',
  color = 'primary',
  onChange,
}: TabProps) => {
  const [selected, setSelected] = useState<string>(initSelected);

  const tabRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const initRef = useRef<boolean>(true);

  const handleChange: TabChangeHandler = (itemRef, value) => {
    if (
      !tabRef.current ||
      !slideRef.current ||
      (selected === value && !initRef.current)
    ) {
      return;
    }

    setSelected(value);

    const tabRect = tabRef.current.getBoundingClientRect();
    const itemRect = itemRef.getBoundingClientRect();

    slideRef.current.style.left = `${
      ((itemRect.x - tabRect.x) / tabRect.width) * 100
    }%`;
    slideRef.current.style.width = `${(itemRect.width / tabRect.width) * 100}%`;

    if (!onChange || initRef.current) {
      initRef.current = false;
      return;
    }

    onChange(value);
  };

  return (
    <TabContext.Provider
      value={{
        selected,
        setSelected: handleChange,
        color,
        init: initRef.current,
      }}
    >
      <s.Tab ref={tabRef} fullWidth={fullWidth} color={color} size={size}>
        {children}
        <Slide ref={slideRef} />
      </s.Tab>
    </TabContext.Provider>
  );
};

export default Tab;
