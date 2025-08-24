import type { Meta, StoryObj } from '@storybook/react';
import { ActionBar } from './ActionBar';

const meta: Meta<typeof ActionBar> = {
  title: 'UI/ActionBar',
  component: ActionBar,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LikeShareMore: Story = {
  args: {
    buttons: [
      {
        iconName: 'like-icon',
        iconNameActive: 'like-icon-fill'
      },
      {
        iconName: 'share-icon'
      },
      {
        iconName: 'more-square-icon'
      }
    ]
  }
};

export const Liked: Story = {
  args: {
    buttons: [
      {
        iconName: 'like-icon',
        iconNameActive: 'like-icon-fill',
        active: true
      }
    ]
  }
};

export const DifferentSizes: Story = {
  args: {
    buttons: [
      {
        iconName: 'calendar-icon',
        size: 96
      },
      {
        iconName: 'arrow-right-icon',
        size: 16
      }
    ]
  }
};

export const DifferentButtonTypes: Story = {
  args: {
    buttons: [
      {
        iconName: 'close-icon',
        type: 'primary'
      },
      {
        iconName: 'clock-icon',
        type: 'secondary'
      },
      {
        iconName: 'gallery-add-icon',
        type: 'tertiary'
      },
      {
        iconName: 'edit-icon',
        type: 'ghost'
      }
    ]
  }
};
