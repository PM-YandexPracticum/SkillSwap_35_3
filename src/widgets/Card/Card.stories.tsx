import { Card } from './Card';
import { CardProps } from './types';

import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

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

const meta: Meta<typeof Card> = {
  title: 'Widgets/Card',
  component: Card,
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

type Story = StoryObj<typeof Card>;

const skills = [
  {
    id: 1,
    title: 'Техника Pomodoro',
    category: 'Бизнес и карьера',
    subcategory: 'Тайм-менеджмент'
  },
  {
    id: 2,
    title: 'Работа с возражениями',
    category: 'Бизнес и карьера',
    subcategory: 'Продажи и переговоры'
  },
  {
    id: 3,
    title: 'Разговорный английский',
    category: 'Иностранные языки',
    subcategory: 'Английский'
  },
  {
    id: 4,
    title: 'Цифровой рисунок в Procreate',
    category: 'Творчество и искусство',
    subcategory: 'Рисование и иллюстрация'
  },
  {
    id: 5,
    title: 'Цифровой рисунок в Procreate',
    category: 'Творчество и искусство',
    subcategory: 'Рисование и иллюстрация'
  }
];

const user: CardProps['user'] = {
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

const onDetails = (id: number) => {
  alert(`Подробнее о пользователе с id: ${id}`);
};

export const WithAndWithoutAbout: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Card user={user} skills={skills} onDetails={onDetails} />
      <Card user={user} skills={skills} onDetails={onDetails} showAbout />
    </div>
  )
};

export const NoSkills: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Card
        user={{ ...user, teachingSkillId: 999 }}
        skills={skills}
        onDetails={onDetails}
      />
      <Card
        user={{ ...user, learningSkillIds: [] }}
        skills={skills}
        onDetails={onDetails}
      />
    </div>
  )
};

export const OneSkill: Story = {
  args: {
    user: { ...user, learningSkillIds: [2] },
    skills,
    onDetails
  }
};
