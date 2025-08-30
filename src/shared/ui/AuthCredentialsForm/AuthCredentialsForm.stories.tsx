import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AuthCredentialsForm } from './AuthCredentialsForm';
import { Button } from '@/shared/ui';
import styles from './AuthCredentialsForm.module.css';

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

const SocialTop = () => (
  <div>
    <div className={styles['auth-form__social']}>
      <Button
        type='secondary'
        size='large'
        fullWidth
        iconName='google-icon'
        className={styles['auth-form__social-button']}
      >
        Продолжить с Google
      </Button>
      <Button
        type='secondary'
        size='large'
        fullWidth
        iconName='apple-icon'
        className={styles['auth-form__social-button']}
      >
        Продолжить с Apple
      </Button>
    </div>

    <div className={styles['auth-form__divider']} aria-hidden='true'>
      <span />
      <span>или</span>
      <span />
    </div>
  </div>
);

const FooterSwitch = ({ toRegister }: { toRegister?: boolean }) => (
  <div className={styles['auth-form__footer-switch']}>
    <button type='button' className={styles['auth-form__footer-switch-btn']}>
      {toRegister ? 'Зарегистрироваться' : 'Войти'}
    </button>
  </div>
);

const WithState = (props: React.ComponentProps<typeof AuthCredentialsForm>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
};

const baseLoginArgs = {
  option: 'login' as const,
  emailLabel: 'Email',
  passwordLabel: 'Пароль',
  emailPlaceholder: 'Введите email',
  passwordPlaceholder: 'Введите пароль',
  submitText: 'Войти',
  passwordHint: undefined,
  topContent: <SocialTop />,
  bottomContent: <FooterSwitch toRegister />
};

const baseRegisterArgs = {
  option: 'register' as const,
  emailLabel: 'Email',
  passwordLabel: 'Пароль',
  emailPlaceholder: 'Введите email',
  passwordPlaceholder: 'Придумайте надёжный пароль',
  submitText: 'Далее',
  passwordHint: 'Пароль должен содержать не менее 8 знаков',
  topContent: <SocialTop />,
  bottomContent: null
};

export const Playground: Story = {
  args: { ...baseLoginArgs },
  render: (args) => <WithState {...args} />
};

export const Login: Story = {
  args: { ...baseLoginArgs },
  render: (args) => <WithState {...args} />
};

export const LoginError: Story = {
  args: {
    ...baseLoginArgs,
    emailError:
      'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных'
  },
  render: (args) => <WithState {...args} />
};

export const Register: Story = {
  args: { ...baseRegisterArgs },
  render: (args) => <WithState {...args} />
};

export const RegisterError: Story = {
  args: {
    ...baseRegisterArgs,
    emailError: 'Email уже используется'
  },
  render: (args) => <WithState {...args} />
};
