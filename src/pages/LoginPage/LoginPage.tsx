import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';

import { Title } from '@/shared/ui/Title';
import { LoginForm } from '@/features/auth/LoginForm/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/profile');
  };

  return (
    <div className={styles.loginpage}>
      <Title as='h2' size='lg'>
        Вход
      </Title>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
