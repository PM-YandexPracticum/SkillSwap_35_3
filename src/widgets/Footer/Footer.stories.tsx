import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom'; // импортируем MemoryRouter
import { Footer } from './Footer';
import { FooterProps } from './types';

export default {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    show: { control: 'boolean' },
    className: { control: 'text' },
    style: { control: 'object' },
    children: { control: false }, // отключаем управление через сторибук
    isSticky: { control: 'boolean' },
    id: { control: 'text' },
    ariaLabel: { control: 'text' },
    'data-cy': { control: 'text' },
    onClick: { action: 'clicked' }
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
const Template: StoryFn<FooterProps> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: true,
  className: '',
  style: {},
  children: null,
  isSticky: false,
  id: 'footer-id',
  ariaLabel: 'Футер сайта',
  'data-cy': 'footer'
};

// История с закрепленным футером
export const Sticky = Template.bind({});
Sticky.args = {
  ...Default.args,
  isSticky: true
};

// История без отображения
export const Hidden = Template.bind({});
Hidden.args = {
  ...Default.args,
  show: false
};
