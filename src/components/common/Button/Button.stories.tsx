import type { Meta, StoryObj } from '@storybook/react';
import { Palette } from '../../../types/theme';

import Button from './Button';

const meta = {
  title: 'UI/common/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '버튼 안에 표시할 내용',
      type: 'string',
    },
    color: {
      description: '버튼의 색상',
      control: 'radio',
    },
    size: {
      description: '버튼의 크기',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      description: '부모 요소의 크기(100%)에 맞출지 여부',
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Md: Story = {
  args: {
    children: 'Button',
    size: 'md',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {[
        'primary',
        'secondary',
        'tertiary',
        'greyScale',
        'success',
        'danger',
      ].map((color) => (
        <Button {...args} color={color as Palette} key={color}>
          {args.children}
        </Button>
      ))}
    </div>
  ),
};
