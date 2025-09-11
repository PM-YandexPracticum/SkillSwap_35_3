import type { Meta, StoryObj } from '@storybook/react';
import { DragAndDrop } from './DragAndDrop';

const meta: Meta<typeof DragAndDrop> = {
  title: 'UI/DragAndDrop',
  component: DragAndDrop,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onFilesSelected: { action: 'files selected' },
    acceptedFileTypes: {
      control: 'object'
    },
    multiple: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    acceptedFileTypes: ['image/*'],
    multiple: true
  }
};

export const SingleImage: Story = {
  args: {
    acceptedFileTypes: ['image/*'],
    multiple: false
  }
};

export const CustomFileTypes: Story = {
  args: {
    acceptedFileTypes: ['image/jpeg', 'image/png'],
    multiple: true
  }
};
