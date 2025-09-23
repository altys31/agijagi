import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../../styles/theme';

import Typhography from './Typhography';

import { TyphographySize } from './Typhography.types';

const meta = {
  title: 'UI/common/Typhography',
  component: Typhography,
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
} satisfies Meta<typeof Typhography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Md: Story = {
  args: {
    children: '아기자기',
    size: 'md',
    color: 'black',
    weight: 'regular',
    shade: '900',
  },
  render: (args) => (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {['md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'].map(
          (size) => (
            <Typhography {...args} size={size as TyphographySize} key={size}>
              {args.children}
            </Typhography>
          )
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {['md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'].map(
          (size) => (
            <Typhography
              {...args}
              weight={'bold'}
              size={size as TyphographySize}
              key={size}
            >
              {args.children}
            </Typhography>
          )
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {['md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'].map(
          (size) => (
            <Typhography
              {...args}
              weight={'extraBold'}
              size={size as TyphographySize}
              key={size}
            >
              {args.children}
            </Typhography>
          )
        )}
      </div>
    </>
  ),
};
