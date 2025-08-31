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
  // состояние загрузки и серверной ошибки из стора
  const isLoading = useSelector(selectAuthIsLoading);
  const serverError = useSelector(selectAuthError);

  // локальные поля формы
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // локальные ошибки валидации
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  // локальная серверная ошибка (копия из стора для гибкого управления)
  const [authError, setAuthError] = useState<string | null>(null);

  // синхронизация серверной ошибки из стора
  useEffect(() => {
    if (serverError) {
      setAuthError(serverError);
    } else {
      setAuthError(null);
    }
  }, [serverError]);

  // простая валидация email
  const isEmailValid = useMemo(() => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, [email]);

  // текущая валидная форма
  const isFormValid = useMemo(() => {
    return !!email && !!password && isEmailValid;
  }, [email, password, isEmailValid]);

  // обработчики изменений с сбросом локальных ошибок
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

  // основной обработчик сабмита
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // сброс предшествующих ошибок перед новой валидацией
    setEmailError(undefined);
    setPasswordError(undefined);
    setAuthError(null);

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
      await dispatch(loginUserThunk({ email, password })).unwrap();
      onLoginSuccess?.();
    } catch (err) {
      const msg =
        typeof err === 'string'
          ? err
          : 'Не удалось войти. Проверьте данные и повторите попытку.';
      setAuthError(msg);
    }
  };

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
      />
      <StepCard />
    </div>
  );
};


/* 
- пропсы: onLoginSuccess?: () => void; onSwitchToRegister?: () => void;
- используется loginUserThunk, селекторы selectAuthIsLoading и selectAuthError
- поля email и password хранятся в локальном state
- ошибки валидации и серверные отображаются
- при наборе текста ошибки очищаются*

1. Тебе надо использовать useState для хранения email и password
2. Проверять поля на пустоту и корректность формата email перед отправкой (валидация).
3. Получать состояние загрузки (isLoading) и ошибки (authError) из стора с помощью селекторов selectAuthIsLoading и selectAuthError.
    Отправлять асинхронный запрос loginUserThunk при сабмите формы.
4. Отображать как ошибки валидации, так и ошибки, пришедшие с сервера.
5. Собрать итоговый интерфейс из универсального AuthCredentialsForm и StepCard.

Самое важное - тебе надо сделать пропсы для формы:
onLoginSuccess?: () => void; // Функция, которая будет вызвана при успехе
onSwitchToRegister?: () => void; // Для кнопки "Зарегистрироваться"

Ты подключаешь нужные данные через диспач и селекторы. Используешь state для хранения значения логина и пароля, а также для хранения ошибок. 
Через useEffect отображаешь серверную ошибку. Нужны обработчики полей для сброса ошибок при наборе текста (handleEmailChange, handlePasswordChange).
Реализуешь основной обработчик отправки формы (handleSubmit = async () =>), который сбрасывает предыдущие ошибки, делает валидацию (email не пустой, имеет корректный формат, пароль не пустой).
Вызываешь thunk для логина 
try {
      await dispatch(loginUserThunk({ email, password })).unwrap();
      onLoginSuccess?.(); // логика редиректа через пропс
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
  };

Далее готовишь topContent и bottomContent через const. В bottomContent передаешь как раз кнопку зарегистрироваться с пропсом onClick={onSwitchToRegister}
И потом рендеришь контент из двух компонентов в див-блоке (1й компонент форма Саши, второй StepCard с передачей нужного содержимого из констант) */