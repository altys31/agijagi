import { Palette, FontWeight, ColorShade } from '../../../types/theme';

export type TyphographyColor = Palette | 'white' | 'black';

export interface TyphographyStyles {
  color?: TyphographyColor;
  weight?: FontWeight;
  size?: TyphographySize;
  shade?: ColorShade;
}

export type TyphographySize =
  | '6xs'
  | '5xs'
  | '4xs'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';
