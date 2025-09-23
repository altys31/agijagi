import type { Meta, StoryObj } from '@storybook/react';
import { Palette } from '../../../types/theme';

import Tab from './';

const meta = {
  title: 'UI/common/Tab',
  component: Tab,
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
  argTypes: {
    children: {
      control: false,
    },
    color: {
      description: '선택된 Tab의 색상',
      control: 'radio',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'greyScale',
        'success',
        'danger',
      ] as Palette[],
    },
    size: {
      description: 'Tab의 크기',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      description: '부모 요소의 크기(100%)에 맞출지 여부',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <Tab.Item value="1">1번</Tab.Item>
        <Tab.Item value="2">2번</Tab.Item>
        <Tab.Item value="3" disabled>
          비활성화된 3번
        </Tab.Item>
        <Tab.Item value="4">4번</Tab.Item>
      </>
    ),
    selected: '1',
    size: 'md',
  },
};
