import { ReactElement } from 'react';

import * as s from './IconButton.style';

interface IconButtonProps {
  children: ReactElement;
  onClick?: () => void;
}

const IconButton = ({ children, onClick }: IconButtonProps) => {
  return <s.Container onClick={onClick}>{children}</s.Container>;
};

export default IconButton;
