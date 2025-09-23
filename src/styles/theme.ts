import { Theme } from '../types/theme';

import colorPalette from './colorPalette';

const theme: Theme = {
  palette: colorPalette,
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      regular: 500,
      bold: 700,
      extraBold: 800,
    },
  },
  color: {
    primary: colorPalette.amber,
    secondary: colorPalette.lime,
    tertiary: colorPalette.yellow,
    greyScale: colorPalette.grey,
    danger: colorPalette.red,
    success: colorPalette.lightGreen,
  },
};

export default theme;
