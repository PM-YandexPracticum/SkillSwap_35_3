import { InputProps } from './type';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Input.module.css';

export const Input = forwardRef<HTMLInputElement>((props: InputProps, ref) => {
  const {
    className,
    type = 'text',
    icon,
    iconPosition,
    search,
    data,
    ...rest
  } = props;

  let resolvedIcon = icon;
  if (search) {
    resolvedIcon = <Icon name='search-icon' />;
  } else if (data) {
    resolvedIcon = <Icon name='calendar-icon' />;
  }

  const iconContainerClasses = clsx(styles.input__icon_container, {
    [styles.input__icon_left]: iconPosition === 'left',
    [styles.input__icon_right]: iconPosition === 'right'
  });

  return (
    <div className={clsx(styles.input__wrapper, className)}>
      <input
        type={type}
        ref={ref}
        className={clsx(styles.input, { [styles.input_search]: search })}
        {...rest}
      />
      {resolvedIcon && (
        <div className={iconContainerClasses}>{resolvedIcon}</div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
