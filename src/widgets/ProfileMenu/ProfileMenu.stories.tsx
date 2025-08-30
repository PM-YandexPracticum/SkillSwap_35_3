import type { Meta, StoryObj } from '@storybook/react';
import { ProfileMenu } from './ProfileMenu';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Widgets/ProfileMenu',
  component: ProfileMenu,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/profile']}>
        <div
          style={{
            width: '300px',
            background: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px'
          }}
        >
          <Story />
        </div>
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
