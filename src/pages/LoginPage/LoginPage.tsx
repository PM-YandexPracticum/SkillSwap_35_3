import React from 'react';

import styles from './LoginPage.module.css';

import { Title } from '@/shared/ui/Title';
import { LoginForm } from '@/features/auth/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <div className={styles.loginpage}>
      <Title as='h2' size='lg'>
        Вход
      </Title>
      <LoginForm></LoginForm>
    </div>
  );
};

export default LoginPage;
