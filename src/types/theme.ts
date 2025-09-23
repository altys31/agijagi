export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type FontWeight = 'regular' | 'bold' | 'extraBold';

export type Palette =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'danger'
  | 'greyScale';

export type ColorShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'A100'
  | 'A200'
  | 'A400'
  | 'A700';

export type Theme = {
  palette: Object;
  typography: {
    fontSize: Record<Size, string>;
    fontWeight: Record<FontWeight, number>;
  };
  color: {
    [key in Palette]: Record<ColorShade, string>;
  };
};
