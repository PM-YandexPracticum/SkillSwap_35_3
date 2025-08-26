import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta: Meta<typeof Title> = {
  title: 'UI/Title',
  component: Title,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    as: { control: 'inline-radio', options: ['h1', 'h2', 'h3', 'h4'] },
    size: { control: 'inline-radio', options: ['xl', 'lg', 'md', 'sm'] },
    className: { control: false },
    children: { control: 'text' }
  }
};
export default meta;

type Story = StoryObj<typeof Title>;

export const Playground: Story = {
  args: {
    as: 'h1',
    size: 'xl',
    children: 'Популярное'
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <Title {...args} size='xl'>
          Title XL - 32/40
        </Title>
        <Title {...args} size='lg'>
          Title LG - 24/28
        </Title>
        <Title {...args} size='md'>
          Title MD - 20/24
        </Title>
        <Title {...args} size='sm'>
          Title SM - 16/24
        </Title>
      </div>
    );
  },
  args: { as: 'h1' }
};

export const Tags: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <Title {...args} as='h1'>
          H1 тип
        </Title>
        <Title {...args} as='h2'>
          H2 тип
        </Title>
        <Title {...args} as='h3'>
          H3 тип
        </Title>
        <Title {...args} as='h4'>
          H4 тип
        </Title>
      </div>
    );
  },
  args: { size: 'xl' }
};
