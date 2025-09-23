import { Palette, Size } from '../../../types/theme';

export interface TabStyles {
  color: Palette;
  size: TabSize;
  fullWidth: boolean;
}

export type TabSize = Extract<Size, 'sm' | 'md' | 'lg'>;
