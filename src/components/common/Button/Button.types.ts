import { Palette, Size } from '../../../types/theme';

export interface ButtonStyles {
  color?: Palette;
  size?: ButtonSize;
}

export type ButtonSize = Extract<Size, 'sm' | 'md' | 'lg'>;
