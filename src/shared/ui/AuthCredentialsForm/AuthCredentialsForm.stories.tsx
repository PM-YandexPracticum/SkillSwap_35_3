import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AuthCredentialsForm } from './AuthCredentialsForm';

const meta: Meta<typeof AuthCredentialsForm> = {
  title: 'UI/Auth/AuthCredentialsForm',
  component: AuthCredentialsForm,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' }
  },
  args: {
    disabled: false,
    loading: false
  }
};
export default meta;

type Story = StoryObj<typeof AuthCredentialsForm>;

function WithState(props: React.ComponentProps<typeof AuthCredentialsForm>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <AuthCredentialsForm
      {...props}
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={() => {}}
    />
  );
}

export const Playground: Story = {
  args: { option: 'login' },
  render: (args) => <WithState {...args} />
};

export const Login: Story = {
  args: { option: 'login' },
  render: (args) => <WithState {...args} />
};

export const LoginError: Story = {
  args: {
    option: 'login',
    emailError:
      'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных'
  },
  render: (args) => <WithState {...args} />
};

export const Register: Story = {
  args: { option: 'register' },
  render: (args) => <WithState {...args} />
};

export const RegisterError: Story = {
  args: {
    option: 'register',
    emailError: 'Email уже используется'
  },
  render: (args) => <WithState {...args} />
};
