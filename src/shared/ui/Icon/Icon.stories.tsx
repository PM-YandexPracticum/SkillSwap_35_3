import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Shared/Icon',
  component: Icon
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
  args: {
    name: 'calendar-icon',
    size: 48
  }
};

export const Fill: Story = {
  args: {
    name: 'add-avatar-icon',
    size: 24,
    fill: '#ABD27A'
  }
};

export const Stroke: Story = {
  args: {
    name: 'user-circle-icon',
    size: 78,
    fill: 'none',
    color: '#ABD27A'
  }
};

export const CustomClass: Story = {
  args: {
    name: 'gallery-add-icon',
    className: 'my-custom-class'
  }
};
