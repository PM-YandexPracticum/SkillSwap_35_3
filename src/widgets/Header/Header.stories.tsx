// Header.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Header, setUseAuth } from './Header';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  args: {
    isSticky: false,
    ariaLabel: 'Основной заголовок',
    'data-cy': 'header'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
  id: 5,
  name: 'Максим',
  about: 'Специалист по цифровому рисованию, обучаю Procreate.',
  avatar:
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
  city: 'Москва',
  birthDate: '2002-02-14',
  teachingSkillId: 1,
  learningSkillIds: [2, 3, 4, 5]
};

// Story для авторизованного пользователя
export const Authenticated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Header для авторизованного пользователя с аватаром и дополнительными кнопками действий'
      }
    }
  },
  loaders: [
    async () => {
      setUseAuth(() => ({
        isAuthenticated: true,
        user: mockUser
      }));
    }
  ]
};

// Story для неавторизованного пользователя
export const NotAuthenticated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Header для неавторизованного пользователя с кнопками входа и регистрации'
      }
    }
  },
  loaders: [
    async () => {
      setUseAuth(() => ({
        isAuthenticated: false,
        user: null
      }));
    }
  ]
};
