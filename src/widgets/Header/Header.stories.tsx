import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  initialState as authInitialState
} from '@/features/auth/slices/authSlice';
import type { IUser } from '@/api/types';

type AuthState = typeof authInitialState;

type MockRootState = {
  auth: AuthState | undefined;
};

const createMockStore = (preloadedState?: Partial<MockRootState>) => {
  const authState = preloadedState?.auth ?? authInitialState;
  return configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: { auth: authState }
  });
};

const meta = {
  title: 'Widgets/Header',
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

const mockUser: IUser = {
  id: 5,
  name: 'Максим',
  gender: 'male',
  email: 'maxim5@example.com',
  password: '123456',
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
  decorators: [
    (Story) => (
      <Provider
        store={createMockStore({
          auth: {
            user: mockUser,
            token: 'some-jwt-token',
            isLoading: false,
            error: null
          }
        })}
      >
        <Story />
      </Provider>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header для авторизованного пользователя'
      }
    }
  }
};

// Story для неавторизованного пользователя
export const NotAuthenticated: Story = {
  decorators: [
    (Story) => (
      <Provider
        store={createMockStore({
          auth: {
            user: null,
            token: null,
            isLoading: false,
            error: null
          }
        })}
      >
        <Story />
      </Provider>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header для неавторизованного пользователя'
      }
    }
  }
};
