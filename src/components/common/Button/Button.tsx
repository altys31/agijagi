import { ReactNode } from 'react';

import * as s from './Button.style';

import { ButtonStyles } from './Button.types';

interface ButtonProps
  extends ButtonStyles,
    Omit<React.ComponentProps<'button'>, 'color'> {
  children: ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  children,
  fullWidth = false,
  color = 'primary',
  size = 'md',
  ...rest
}: ButtonProps) => {
  return (
    <s.Container fullWidth={fullWidth}>
      <s.Shadow size={size}></s.Shadow>
      <s.Button
        fullWidth={fullWidth}
        size={size}
        backgroundColor={color}
        {...rest}
      >
        {children}
      </s.Button>
    </s.Container>
  );
};

export default Button;
