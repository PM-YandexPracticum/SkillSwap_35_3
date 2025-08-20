import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Logo from './Logo'; // путь к вашему компоненту

const meta: Meta<typeof Logo> = {
  title: 'UI/Logo',
  component: Logo,
  args: {
    size: 40,
    text: 'Skillbox',
    titleSize: 'lg'
  },
  parameters: {
    docs: {
      description: {
        component:
          'Компонент логотипа с возможностью настройки размера, текста и цвета. Автоматически подтягивает цвет из CSS переменной.'
      }
    }
  }
};
export default meta;

type Story = StoryObj<typeof Logo>;

// Базовая история
export const Basic: Story = {
  args: {
    size: 40,
    text: 'Skillbox',
    titleSize: 'lg'
  }
};

// История с изменением размера и текста
export const LargeSizeAndCustomText: Story = {
  args: {
    size: 80,
    text: 'Большой логотип',
    titleSize: 'xl'
  }
};

// История с обработчиком клика
export const ClickableLogo: Story = {
  args: {
    size: 60,
    text: 'Кликабельный',
    titleSize: 'md'
  },
  render: (args) => <Logo {...args} onClick={() => alert('Логотип кликнут!')} />
};

// История с кастомным цветом (например, передать через пропс)
export const CustomColor: Story = {
  args: {
    size: 50,
    text: 'Цветной логотип',
    color: 'red',
    titleSize: 'sm'
  }
};
