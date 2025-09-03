import { MemoryRouter } from 'react-router-dom';
import { CardsFeed } from './CardsFeed';
import mockData from '@/api/mockData.json';
import { IUser } from '@/api/types';

import type { Meta, StoryObj } from '@storybook/react';
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

const usersTyped = mockData.users.map((user) => ({
  ...user,
  gender: user.gender === 'male' ? 'male' : 'female'
})) as IUser[];

const meta: Meta<typeof CardsFeed> = {
  title: 'Widgets/CardsFeed',
  component: CardsFeed,
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
type Story = StoryObj<typeof CardsFeed>;

export const Default: Story = {
  args: {
    usersData: usersTyped,
    skillsData: mockData.skills
  }
};
