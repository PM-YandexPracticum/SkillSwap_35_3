import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Avatar from './Avatar';

import mockData from '@/api/mockData.json';

const users = mockData.users;

export default {
  title: 'UI/Avatar',
  component: Avatar,
} as Meta;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: users[0]?.avatar || '',
  alt: `Аватар ${users[0]?.name || 'пользователя'}`,
};

export const SecondAvatar = Template.bind({});
SecondAvatar.args = {
  src: users[1]?.avatar || '',
  alt: `Аватар ${users[1]?.name || 'пользователя'}`,
};

// Отображение всех аватаров с переносом и сохранением пропорций
export const AllAvatars = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    {users.map((user) => (
      <Avatar key={user.id} src={user.avatar} alt={`Аватар ${user.name}`} />
    ))}
  </div>
);
