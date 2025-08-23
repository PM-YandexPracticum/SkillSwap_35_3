import type { Meta, StoryObj } from '@storybook/react';
import { ActionBar } from './ActionBar';

const meta: Meta<typeof ActionBar> = {
  title: 'UI/ActionBar',
  component: ActionBar,
  tags: ['autodocs'],
  args: {
    liked: false
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    liked: false
  }
};

export const Liked: Story = {
  args: {
    liked: true
  }
};
