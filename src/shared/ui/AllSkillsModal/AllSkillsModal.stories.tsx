import type { Meta, StoryObj } from '@storybook/react';
import AllSkillsModal from './AllSkillsModal';

const meta: Meta<typeof AllSkillsModal> = {
  title: 'Components/AllSkillsModal',
  component: AllSkillsModal,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof AllSkillsModal>;

export const Default: Story = {
  args: {
    isOpen: true
  }
};

export const Closed: Story = {
  args: {
    isOpen: false
  }
};
