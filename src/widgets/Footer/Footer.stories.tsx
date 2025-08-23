import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Footer } from './Footer';
import { FooterProps } from './types';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'shared/Footer',
  component: Footer,
  argTypes: {
    show: { control: 'boolean' },
    isSticky: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    height: { control: 'text' },
    padding: { control: 'text' },
    onClick: { action: 'clicked' },
    style: { control: 'object' },
    children: { control: 'text' }
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} as Meta;

// Базовая история
const Template: Story<FooterProps> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: true,
  isSticky: false,
  backgroundColor: undefined,
  height: undefined,
  padding: undefined,
  className: '',
  style: {}, // Можно оставить пустым или добавить стили по необходимости
  children: null
};