import { useState } from 'react';
import cn from 'clsx';
import { Input, Button, Icon } from '@/shared/ui';
import styles from './AuthCredentialsForm.module.css';
import type { AuthFormProps } from './types';

export const AuthCredentialsForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  emailError,
  passwordError,
  emailLabel,
  passwordLabel,
  emailPlaceholder,
  passwordPlaceholder,
  submitText,
  passwordHint,
  passwordAutoComplete,
  disabled,
  loading,
  topContent,
  children,
  bottomContent
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isDisabled = Boolean(disabled || loading);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isDisabled) onSubmit?.();
  };

  return (
    <div className={cn(styles['auth-form'], className)}>
      <div className={styles['auth-form__card']}>
        <form
          className={styles['auth-form__form']}
          onSubmit={handleSubmit}
          noValidate
        >
          {topContent}

          <div
            className={cn(styles['auth-form__field'], {
              [styles['auth-form__field--error']]: !!emailError
            })}
          >
            {emailLabel && (
              <label
                className={styles['auth-form__label']}
                htmlFor='auth-email'
              >
                {emailLabel}
              </label>
            )}
            <Input
              id='auth-email'
              type='email'
              placeholder={emailPlaceholder}
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

          {children}

          <div
            className={cn(styles['auth-form__field'], {
              [styles['auth-form__field--error']]: !!passwordError
            })}
          >
            {passwordLabel && (
              <label
                className={styles['auth-form__label']}
                htmlFor='auth-password'
              >
                {passwordLabel}
              </label>
            )}
            <Input
              id='auth-password'
              type={showPassword ? 'text' : 'password'}
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(event) =>
                onPasswordChange?.(event.currentTarget.value)
              }
              name='password'
              autoComplete={passwordAutoComplete}
              disabled={isDisabled}
              icon={
                <button
                  type='button'
                  aria-label={
                    showPassword ? 'Скрыть пароль' : 'Показать пароль'
                  }
                  onClick={() => setShowPassword((value) => !value)}
                  className={styles['auth-form__eye-button']}
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
              {passwordError ?? passwordHint}
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
              {submitText}
            </Button>
          </div>
        </form>

        {bottomContent}
      </div>
    </div>
  );
};
