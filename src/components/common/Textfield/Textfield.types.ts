import { Palette, Size } from '../../../types/theme';

export type TextfieldColor = Extract<
  Palette,
  'primary' | 'secondary' | 'tertiary' | 'greyScale'
>;

export type TextfieldSize = Extract<Size, 'sm' | 'md' | 'lg'>;

export type ValidationState = Extract<Palette, 'danger' | 'success'> | 'normal';
