import type { Meta, StoryObj } from '@storybook/react';

import { FullCalendar } from './index';

const meta = {
  title: 'UI/common/FullCalendar',
  component: FullCalendar,
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
} satisfies Meta<typeof FullCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Md: Story = {
  render: (args) => (
    <>
      <FullCalendar></FullCalendar>
    </>
  ),
};
