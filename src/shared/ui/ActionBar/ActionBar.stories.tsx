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
        iconNameActive: 'like-icon-fill',
        onClick: () => {},
        ariaLabel: 'Like'
      },
      {
        iconName: 'share-icon',
        onClick: () => {},
        ariaLabel: 'Share'
      },
      {
        iconName: 'more-square-icon',
        onClick: () => {},
        ariaLabel: 'More'
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
        active: true,
        onClick: () => {},
        ariaLabel: 'Like'
      }
    ]
  }
};

export const DifferentSizes: Story = {
  args: {
    buttons: [
      {
        iconName: 'calendar-icon',
        size: 96,
        onClick: () => {},
        ariaLabel: 'Calendar'
      },
      {
        iconName: 'arrow-right-icon',
        size: 16,
        onClick: () => {},
        ariaLabel: 'Arrow Right'
      }
    ]
  }
};

export const DifferentButtonTypes: Story = {
  args: {
    buttons: [
      {
        iconName: 'close-icon',
        type: 'primary',
        onClick: () => {},
        ariaLabel: 'Close'
      },
      {
        iconName: 'clock-icon',
        type: 'secondary',
        onClick: () => {},
        ariaLabel: 'Clock'
      },
      {
        iconName: 'gallery-add-icon',
        type: 'tertiary',
        onClick: () => {},
        ariaLabel: 'Gallery Add'
      },
      {
        iconName: 'edit-icon',
        type: 'ghost',
        onClick: () => {},
        ariaLabel: 'Edit'
      }
    ]
  }
};
