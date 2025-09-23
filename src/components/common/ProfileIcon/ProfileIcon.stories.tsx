import type { Meta, StoryObj } from '@storybook/react';

import ProfileIcon from './ProfileIcon';

const meta = {
  title: 'UI/common/ProfileIcon',
  component: ProfileIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '프로필 아이콘 크기입니다',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof ProfileIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    onClick: () => {alert('프로필 이미지를 클릭했습니다')},
  },
};
