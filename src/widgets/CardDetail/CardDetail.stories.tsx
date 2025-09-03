import type { Meta, StoryObj } from '@storybook/react';
import { CardDetail } from './CardDetail';
import mock from '@/api/mockData.json';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '@/entities/User/slices/usersSlice';
import skillsReducer from '@/entities/Skill/slices/skillsSlice';
import favoritesReducer from '@/features/favorites/slices/likeSlice';
import authReducer from '@/features/auth/slices/authSlice';
import { likesReducer } from '@/features/favorites';

const store = configureStore({
  reducer: {
    users: usersReducer,
    skills: skillsReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    likes: likesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

store.dispatch({
  type: 'auth/setAuthState',
  payload: {
    token: 'demo-token',
    user: null
  }
});

const mockSkill = mock.skills[0];

const meta: Meta<typeof CardDetail> = {
  title: 'widgets/CardDetail',
  component: CardDetail,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ],
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    skill: mockSkill
  }
};

export const LoadingOrNoData: Story = {
  args: {
    skill: null
  }
};
