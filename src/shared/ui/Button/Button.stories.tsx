import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    iconName: {
      control: { type: 'select' },
      options: [
        'arrow-right-icon',
        'close-icon',
        'edit-icon',
        'like-icon',
        'category-art-icon'
      ]
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    fullWidth: {
      control: { type: 'boolean' }
    },
    onClick: { action: 'clicked' }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    children: 'Secondary Button'
  }
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    children: 'Tertiary Button'
  }
};

export const WithLeftIcon: Story = {
  args: {
    type: 'primary',
    children: 'With Icon',
    iconName: 'arrow-right-icon',
    iconPosition: 'left'
  }
};

export const WithRightIcon: Story = {
  args: {
    type: 'primary',
    children: 'With Icon',
    iconName: 'arrow-right-icon',
    iconPosition: 'right'
  }
};

export const WithCustomIconSize: Story = {
  args: {
    type: 'primary',
    children: 'Edit',
    iconName: 'edit-icon',
    iconSize: 32,
    iconPosition: 'right'
  }
};

export const WithOldIcon: Story = {
  args: {
    type: 'primary',
    children: 'Legacy Icon',
    icon: <div style={{ fontSize: 20 }}>★</div>,
    iconPosition: 'left'
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button'
  }
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button'
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button'
  }
};

export const IconOnly: Story = {
  args: {
    iconName: 'like-icon',
    children: null
  }
};
