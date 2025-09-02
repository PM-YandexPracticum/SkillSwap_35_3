import type { Meta, StoryObj } from '@storybook/react';

import { UserMenu } from './UserMenu';

const meta: Meta<typeof UserMenu> = {
  title: 'UI/UserMenu',
  component: UserMenu,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof UserMenu>;

const onProfileClick = () => alert('Личный кабинет');
const onLogoutClick = () => alert('Выход из аккаунта');

export const Default: Story = {
  args: {
    onProfile: onProfileClick,
    onLogout: onLogoutClick
  }
};
