import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../styles/theme';

import DiaryTyphography from './DiaryTyphography';

import { TyphographySize } from '../Typography/Typhography.types';
import GlobalStyle from '../../../styles/GlobalStyle';

const meta = {
  title: 'UI/common/DiaryTyphography',
  component: DiaryTyphography,
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
      description: '표시할 텍스트 내용',
      type: 'string',
    },
    color: {
      description: '텍스트의 색상',
      options: [...Object.keys(theme.color), 'white', 'black'],
      control: 'select',
    },
    shade: {
      description: '텍스트의 색상의 명암',
      control: 'select',
    },
    size: {
      description: '텍스트의 크기',
      control: 'select',
    },
  },
} satisfies Meta<typeof DiaryTyphography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Md: Story = {
  args: {
    children: '아기자기',
    size: 'md',
    color: 'black',
    shade: '900',
  },
  render: (args) => (
    <>
      <GlobalStyle />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {['md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'].map(
          (size) => (
            <DiaryTyphography
              {...args}
              size={size as TyphographySize}
              key={size}
            >
              {args.children}
            </DiaryTyphography>
          )
        )}
      </div>
      <div>
        <DiaryTyphography {...args}>{args.children}</DiaryTyphography>
      </div>
    </>
  ),
};
