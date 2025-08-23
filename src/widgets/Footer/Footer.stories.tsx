import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { Footer } from './Footer';
import { FooterProps } from './types';

export default {
  title: 'Shared/Footer',
  component: Footer,
  argTypes: {
    show: { control: 'boolean' },
    isSticky: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    height: { control: 'text' },
    padding: { control: 'text' },
    onClick: { action: 'clicked' },
    style: { control: 'object' }
  },
  // Добавляем декоратор, который оборачивает все истории в MemoryRouter
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

// Базовая история
const Template: Story<FooterProps> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: true,
  className: '',
  style: {},
  children: null,
  isSticky: false,
  backgroundColor: '#f0f0f0',
  height: '100px',
  padding: '10px',
  onClick: () => alert('Footer clicked!'),
  id: 'footer-id',
  ariaLabel: 'Футер сайта',
  'data-cy': 'footer'
};

// История без отображения (скрыт)
export const Hidden = Template.bind({});
Hidden.args = {
  show: false
};

// История с закрепленным футером
export const Sticky = Template.bind({});
Sticky.args = {
  show: true,
  isSticky: true,
  backgroundColor: '#333',
  height: '80px'
};

// История с кастомными стилями
export const CustomStyles = Template.bind({});
CustomStyles.args = {
  show: true,
  style: {
    backgroundColor: '#ffcc00',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
  }
};