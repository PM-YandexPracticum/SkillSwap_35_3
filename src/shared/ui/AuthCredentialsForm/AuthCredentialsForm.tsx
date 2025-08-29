import { useState } from 'react';
import cn from 'clsx';
import { Input, Button, Icon } from '@/shared/ui';
import styles from './AuthCredentialsForm.module.css';
import type { AuthFormProps } from './types';

export function AuthCredentialsForm({
  option,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  emailError,
  passwordError,
  disabled,
  loading,
  className
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = option === 'login';
  const isDisabled = Boolean(disabled || loading);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isDisabled) return;
    onSubmit?.();
  };

  return (
    <main className={styles['auth-form']}>
      <div className={cn(styles['auth-form__card'], className)}>
        <form
          className={styles['auth-form__form']}
          onSubmit={handleSubmit}
          noValidate
        >
          <>
            <div className={styles['auth-form__social']}>
              <Button
                type='secondary'
                size='large'
                fullWidth
                disabled={isDisabled}
                iconName='google-icon'
                className={cn(
                  styles['auth-form__social-button'],
                  styles['auth-form__nowrap']
                )}
              >
                Продолжить с Google
              </Button>
              <Button
                type='secondary'
                size='large'
                fullWidth
                disabled={isDisabled}
                iconName='apple-icon'
                className={cn(
                  styles['auth-form__social-button'],
                  styles['auth-form__nowrap']
                )}
              >
                Продолжить с Apple
              </Button>
            </div>

            <div className={styles['auth-form__divider']} aria-hidden='true'>
              <span />
              <span>или</span>
              <span />
            </div>
          </>

          <div
            className={cn(styles['auth-form__field'], {
              [styles['auth-form__field--error']]: !!emailError
            })}
          >
            <label className={styles['auth-form__label']} htmlFor='auth-email'>
              Email
            </label>
            <Input
              id='auth-email'
              type='email'
              placeholder='Введите email'
              value={email}
              onChange={(event) => onEmailChange?.(event.currentTarget.value)}
              name='email'
              autoComplete='email'
              disabled={isDisabled}
              aria-invalid={!!emailError || undefined}
            />
            <div
              className={styles['auth-form__msg']}
              aria-live='polite'
              role={emailError ? 'alert' : undefined}
            >
              {emailError}
            </div>
          </div>

          <div
            className={cn(styles['auth-form__field'], {
              [styles['auth-form__field--error']]: !!passwordError
            })}
          >
            <label
              className={styles['auth-form__label']}
              htmlFor='auth-password'
            >
              Пароль
            </label>
            <Input
              id='auth-password'
              type={showPassword ? 'text' : 'password'}
              placeholder={
                isLogin ? 'Введите ваш пароль' : 'Придумайте надёжный пароль'
              }
              value={password}
              onChange={(event) =>
                onPasswordChange?.(event.currentTarget.value)
              }
              name='password'
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              disabled={isDisabled}
              icon={
                <button
                  type='button'
                  aria-label={
                    showPassword ? 'Скрыть пароль' : 'Показать пароль'
                  }
                  onClick={() => setShowPassword((v) => !v)}
                  style={{ all: 'unset', cursor: 'pointer' }}
                >
                  <Icon name='eye-icon' size={20} />
                </button>
              }
              iconPosition='right'
              aria-invalid={!!passwordError || undefined}
            />
            <div
              className={styles['auth-form__msg']}
              aria-live='polite'
              role={passwordError ? 'alert' : undefined}
            >
              {passwordError ??
                (!isLogin ? 'Пароль должен содержать не менее 8 знаков' : null)}
            </div>
          </div>

          <div className={styles['auth-form__actions']}>
            <Button
              type='primary'
              size='medium'
              htmlType='submit'
              fullWidth
              disabled={isDisabled}
              className={styles['auth-form__actions-button']}
            >
              {isLogin ? 'Войти' : 'Далее'}
            </Button>
          </div>
        </form>

        {option === 'login' && (
          <div className={styles['auth-form__footer-switch']}>
            <button
              type='button'
              className={styles['auth-form__footer-switch-btn']}
            >
              Зарегистрироваться
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
