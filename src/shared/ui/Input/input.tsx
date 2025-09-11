import { InputProps } from './type';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import styles from './Input.module.css';
import { Icon } from '../Icon';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {
      className,
      type = 'text',
      icon,
      search,
      iconPosition,
      message,
      error,
      ...rest
    } = props;

    const [passwordVisible, setPasswordVisible] = useState(false);

    const inputType = type === 'password' && passwordVisible ? 'text' : type;

    const showToggle = type === 'password';

    const iconContainerClasses = clsx(styles.input__icon_container, {
      [styles.input__icon_left]: iconPosition === 'left',
      [styles.input__icon_right]: iconPosition === 'right'
    });

    return (
      <div className={styles['input__container']}>
        <div className={clsx(styles.input__wrapper, className)}>
          <input
            type={inputType}
            ref={ref}
            className={clsx(
              styles.input,
              { [styles.input_search]: search },
              { [styles.input__error]: error }
            )}
            {...rest}
          />
          {icon && !showToggle && (
            <div className={iconContainerClasses}>{icon}</div>
          )}
          {showToggle && (
            <button
              type='button'
              className={clsx(
                iconContainerClasses,
                styles['input__toggle-button']
              )}
              onClick={() => setPasswordVisible((prev) => !prev)}
              aria-label={passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            >
              <Icon name='eye-icon' />
            </button>
          )}
        </div>
        {message ? (
          <span
            className={clsx(styles['input__message'], {
              [styles['input__error-message']]: error
            })}
          >
            {message}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
