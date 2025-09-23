import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Textfield from './Textfield';
import { TextfieldColor, ValidationState } from './Textfield.types';

const meta = {
  title: 'UI/common/Textfield',
  component: Textfield,
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
    label: {
      description: '입력필드의 라벨',
      type: 'string',
    },
    size: {
      description: '입력필드의 크기',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      description: '입력필드의 색상',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'greyScale'],
    },
    fullWidth: {
      description: '전체 넓이 여부',
      options: [true, false],
    },
    isColoredLabel: {
      description: '라벨과 입력필드 텍스트의 색상 여부(없으면 검은색)',
    },
    helpText: {
      description: '사용자에게 입력필드에 대한 설명을 하는 텍스트',
    },
    checkText: {
      description: '유효성 검사시 사용자에게 성공을 알리는 텍스트',
    },
    warningText: {
      description: '유효성 검사시 사용자에게 실패와 규칙을 알려주는 텍스트',
    },
    inputValue: {
      description: 'Controll 되는 데이터(state)',
    },
    validationFunction: {
      description: '유효성 검사시 사용되는 함수',
    },
    onChange: {
      description: '입력필드에 입력되는 값 변경시 실행되는 onChange함수 ',
    },
    setInputValue: {
      description: '상위 컴포넌트의 State를 컨트롤하기위한 setState함수',
    },
    type: {
      description: 'HTML input 태그에 들어가는 type',
    },
  },
} satisfies Meta<typeof Textfield>;

export default meta;

type Story = StoryObj<typeof Textfield>;

function validateInput(input: string): ValidationState {
  if (input.trim() === '') {
    return 'normal';
  }
  if (input.length >= 2 && input.length <= 8) {
    return 'success';
  }
  return 'danger';
}

export const Default: Story = {
  render: (args) => {
    const [inputValue, setInputValue] = useState(args.inputValue || '');
    const colorList = ['primary', 'secondary', 'tertiary', 'greyScale'];

    return (
      <>
        <Textfield
          {...args}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </>
    );
  },
  args: {
    label: '이름',
    size: 'md',
    fullWidth: false,
    isColoredLabel: false,
    helpText: '*이름은 필수항목이에요',
    checkText: '올바르게 입력되었어요',
    warningText: '이름은 2~8자의 형식을 만족해야해요',
    validationFunction: validateInput,
  },
};
