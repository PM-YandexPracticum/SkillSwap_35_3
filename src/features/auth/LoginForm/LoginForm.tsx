import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '@/features/auth/thunks/authThunks';
import {
  selectAuthIsLoading,
  selectAuthError
} from '@/features/auth/selectors/authSelectors';

import { AuthCredentialsForm } from '@/shared/ui/AuthCredentialsForm/AuthCredentialsForm';
import { StepCard } from '@/shared/ui/StepCard';

import type { AppDispatch } from '@/app/store';

import { LoginFormProps } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onSwitchToRegister
}) => {
  const dispatch = useDispatch<AppDispatch>();
  // Получать состояние загрузки (isLoading) и ошибки (authError) из стора с помощью селекторов selectAuthIsLoading и selectAuthError.
  const isLoading = useSelector(selectAuthIsLoading);
  const serverError = useSelector(selectAuthError);

  // useState для хранения email и password
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // локальные стейты ошибок валидации
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  // общая ошибка сервера (можно переиспользовать serverError напрямую)
  const [authError, setAuthError] = useState<string | null>(null);

  // Очистка серверной ошибки при изменении полей
  useEffect(() => {
    if (serverError) {
      // отражаем серверную ошибку в локальной копии, чтобы можно сбросить вручную
      setAuthError(serverError);
    } else {
      // если серверная ошибка исчезла в сторе, очистим локально
      setAuthError(null);
    }
  }, [serverError]);

  // Валидация простая: формат email и непустой пароль
  const isEmailValid = useMemo(() => {
    if (!email) return false;
    // простой regex для email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, [email]);

  const isFormValid = useMemo(() => {
    return !!email && !!password && isEmailValid;
  }, [email, password, isEmailValid]);

  // Обработчики изменений с сбросом ошибок локально
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(undefined);
    if (authError) setAuthError(null); // оставить как есть, если authError будет string | null
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError(undefined);
    if (authError) setAuthError(null);
  };

  // основной обработчик сабмита
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // локальная валидация перед отправкой
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

    try {
      // отправка логина через thunk
      await dispatch(loginUserThunk({ email, password })).unwrap();
      onLoginSuccess?.();
    } catch (err) {
      // локальное отображение ошибки (серверная ошибка уже может быть в authError)
      const msg =
        typeof err === 'string'
          ? err
          : 'Не удалось войти. Проверьте данные и повторите попытку.';
      setAuthError(msg);
    }
  };

  // Список пропсов для универсальной формы
  const formTopContent = null;
  const formBottomContent = (
    <div style={{ marginTop: 8 }}>
      <button
        type='button'
        onClick={onSwitchToRegister}
        aria-label='Зарегистрироваться'
      >
        Зарегистрироваться
      </button>
    </div>
  );

  return (
    <div title='Вход в аккаунт'>
      {' '}
      {/* если StepCard требует другие пропсы, адаптируйте */}
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
        disabled={false}
        loading={isLoading}
        className=''
        topContent={formTopContent}
        bottomContent={
          <>
            {formBottomContent}
            {authError && (
              <div
                role='alert'
                aria-live='polite'
                style={{ color: 'var(--color-error)', marginTop: 8 }}
              >
                {authError}
              </div>
            )}
          </>
        }
      ></AuthCredentialsForm>
      {/* StepCard */}
      <StepCard></StepCard>
    </div>
  );
};

/* 
- пропсы: onLoginSuccess?: () => void; onSwitchToRegister?: () => void;
- используется loginUserThunk, селекторы selectAuthIsLoading и selectAuthError
- поля email и password хранятся в локальном state
- ошибки валидации и серверные отображаются
- при наборе текста ошибки очищаются*/
