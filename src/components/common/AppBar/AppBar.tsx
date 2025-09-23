import { ReactComponent as Cloud } from '../../../assets/images/appbar/cloud.svg';

import * as s from './AppBar.style';

import theme from '../../../styles/theme';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  color?: string;
  height?: string;
}

const AppBar = ({
  children,
  color = theme.color.primary[500],
  height = '4rem',
}: ButtonProps) => {
  return (
    <s.Container>
      <s.AppBar color={color} height={height}>
        {children}
      </s.AppBar>
      <s.Cloud>
        <Cloud fill={color} />
      </s.Cloud>
    </s.Container>
  );
};

export default AppBar;
