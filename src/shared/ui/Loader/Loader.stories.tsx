import { Loader } from './Loader';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLoader: Story = {
  args: {}
};
