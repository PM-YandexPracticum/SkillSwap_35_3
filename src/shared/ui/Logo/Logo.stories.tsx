import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo'; // путь к вашему компоненту

const meta: Meta<typeof Logo> = {
  title: 'UI/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: {
    size: 160
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
    size: 160
  }
};

// История с изменением размера и текста
export const SmallSize: Story = {
  args: {
    size: 80
  }
};

// История с обработчиком клика
export const ClickableLogo: Story = {
  render: (args) => <Logo {...args} onClick={() => alert('Логотип кликнут!')} />
};
