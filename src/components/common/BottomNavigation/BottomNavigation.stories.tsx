import type { Meta, StoryObj } from '@storybook/react';

import { BottomNavigation } from './BottomNavigation';

const meta = {
  component: BottomNavigation,
} satisfies Meta<typeof BottomNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};