import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useLocation, useNavigate } from 'react-router-dom';
import { loginUserThunk } from '@/features/auth/thunks/authThunks';
import {
  selectAuthIsLoading,
  selectAuthError
} from '@/features/auth/selectors/authSelectors';

import { AuthCredentialsForm } from '@/shared/ui/AuthCredentialsForm/AuthCredentialsForm';
import { StepCard } from '@/shared/ui/StepCard';
import { steps } from '@/shared/lib/constants/steps';
import { Button } from '@/shared/ui';

import styles from './LoginForm.module.css';\

import type { AppDispatch } from '@/app/store';

import { LoginFormProps } from './types';

export const LoginForm = ({
  onLoginSuccess,
  onSwitchToRegister
}: LoginFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectAuthIsLoading);
  const serverError = useSelector(selectAuthError);

  // useState для хранения email и password
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  const [authError, setAuthError] = useState<string | null>(null);

  // Обновление ошибки из стора
  useEffect(() => {
    if (serverError) {
      setAuthError(serverError);
    } else {
      setAuthError(null);
    }
  }, [serverError]);

  // Валидация email
  const isEmailValid = useMemo(() => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, [email]);

  // Проверка валидности формы
  const isFormValid = useMemo(() => {
    return !!email && !!password && isEmailValid;
  }, [email, password, isEmailValid]);

  // Обработчики изменения email и пароля
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(undefined);
    if (authError) setAuthError(null);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError(undefined);
    if (authError) setAuthError(null);
  };

  // Обработка отправки формы
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Сброс ошибок перед валидацией
    setEmailError(undefined);
    setPasswordError(undefined);
    setAuthError(null);

    // Валидация
    let hasError = false;
    if (!email) {
      setEmailError('Пожалуйста, введите email');
      hasError = true;
    } else if (!isEmailValid) {
      setEmailError('Некорректный формат email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Пожалуйста, введите пароль');
      hasError = true;
    }

    if (hasError) return;

    // Попытка логина
    try {
      await dispatch(loginUserThunk({ email, password })).unwrap();
      onLoginSuccess?.();
    } catch (err) {
      const msg =
        typeof err === 'string'
          ? err
          : 'Email или пароль введён неверно. Пожалуйста, проверьте правильность данных.';
      setAuthError(msg);
    }
  };

  // topContent
  const formTopContent = (
    <div className={styles['loginform__social']}>
      <Button
        type='secondary'
        size='large'
        fullWidth
        iconName='google-icon'
        className={styles['loginform__social-button']}
      >
        Продолжить с Google
      </Button>
      <Button
        type='secondary'
        size='large'
        fullWidth
        iconName='apple-icon'
        className={styles['loginform__social-button']}
      >
        Продолжить с Apple
      </Button>
    </div>
  );

  // bottomContent
  const formBottomContent = (
    <div className={styles['loginform__footer-switch']}>
      <button
        type='button'
        onClick={onSwitchToRegister}
        aria-label='Зарегистрироваться'
        className={styles['loginform__footer-switch-btn']}
      >
        Зарегистрироваться
      </button>
    </div>
  );

  return (
    <div title='Вход в аккаунт' className={styles.loginform}>
      <AuthCredentialsForm
        option='login'
        email={email}
        password={password}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
        emailError={emailError}
        passwordError={passwordError}
        emailLabel='Email'
        passwordLabel='Пароль'
        emailPlaceholder='name@example.com'
        passwordPlaceholder='Ваш пароль'
        submitText={isLoading ? 'Вход...' : 'Войти'}
        passwordHint='Используйте ваш пароль'
        passwordAutoComplete='current-password'
        loading={isLoading}
        className=''
        topContent={formTopContent}
        bottomContent={formBottomContent}
        disabled={isLoading || !isFormValid}
      />

      <StepCard
        title={steps.welcomeBack.title}
        description={steps.welcomeBack.description}
        imageSrc={steps.welcomeBack.imageSrc}
      />
    </div>
  );
};
