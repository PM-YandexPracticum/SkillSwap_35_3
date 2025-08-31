import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { LoginForm } from './LoginForm';

export default {
  title: 'Features/Auth/LoginForm',
  component: LoginForm
} as Meta;

const Template: StoryFn = () => <LoginForm />;

export const Default = Template.bind({});
