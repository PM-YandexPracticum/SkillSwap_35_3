import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { Icon } from '@/shared/ui/Icon';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Тип изменения размера'
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция иконки'
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled'
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер'
    },
    value: {
      control: 'text',
      description: 'Значение'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// Базовая текстовая область
export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    rows: 3
  }
};

// С плейсхолдером
export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Расскажите о себе...'
  }
};

// С иконкой справа
export const WithRightIcon: Story = {
  args: {
    placeholder: 'Ваш email...',
    icon: <Icon name={'edit-icon'} size={20} />,
    iconPosition: 'right'
  }
};
