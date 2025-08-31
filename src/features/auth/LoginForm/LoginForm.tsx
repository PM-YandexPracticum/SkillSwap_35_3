import React from 'react';
import { AuthCredentialsForm } from '@/shared/ui/AuthCredentialsForm/AuthCredentialsForm';
import { StepCard } from '@/shared/ui/StepCard';
import { steps } from '@/shared/lib/constants/steps';
import { Button } from '@/shared/ui';

import styles from './LoginForm.module.css';

export const LoginForm: React.FC = () => {
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

  const formBottomContent = (
    <div className={styles['loginform__footer-switch']}>
      <button
        type='button'
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
        email=''
        password=''
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onSubmit={() => {}}
        emailError={undefined}
        passwordError={undefined}
        emailLabel='Email'
        passwordLabel='Пароль'
        emailPlaceholder='name@example.com'
        passwordPlaceholder='Ваш пароль'
        submitText='Войти'
        passwordHint='Используйте ваш пароль'
        passwordAutoComplete='current-password'
        loading={false}
        className=''
        topContent={formTopContent}
        bottomContent={formBottomContent}
        disabled={true}
      />

      <StepCard
        title={steps.welcomeBack.title}
        description={steps.welcomeBack.description}
        imageSrc={steps.welcomeBack.imageSrc}
      />
    </div>
  );
};

/* import React, { useEffect, useState, useMemo } from 'react';
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

import type { AppDispatch } from '@/app/store';

import { LoginFormProps } from './types';
import styles from './LoginForm.module.css';

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onSwitchToRegister
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectAuthIsLoading);
  const serverError = useSelector(selectAuthError);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  const [authError, setAuthError] = useState<string | null>(null);

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
          : 'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных.';
      setAuthError(msg);
    }
  };

  const formTopContent = (
    <div>
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
    </div>
  );

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

/* 

export const LoginForm: React.FC<LoginFormProps> = ({
 onLoginSuccess, onSwitchToRegister }) => { const dispatch = useDispatch<AppDispatch>(); const isLoading = useSelector(selectAuthIsLoading); const serverError = useSelector(selectAuthError);

// для редиректа const location = useLocation(); const navigate = useNavigate();

// seed mock-пользователя в localStorage (если ещё нет) useEffect(() => { try { const stored = localStorage.getItem('mock_users'); if (!stored) { const initial = [ { email: 'user@example.com', password: '123456' } ]; localStorage.setItem('mock_users', JSON.stringify(initial)); } } catch { // игнорируем ошибки локального хранилища } }, []);

// текущие поля и состояния (уже есть)

// после успешной аутентификации редирект const handleLoginSuccessAndRedirect = () => { // если был предшедший location.state.from.pathname const fromPath = (location.state as any)?.from?.pathname; navigate(fromPath || '/', { replace: true }); };

// Основной блок handleSubmit const handleSubmit = async (e?: React.FormEvent) => { if (e) e.preventDefault();


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
