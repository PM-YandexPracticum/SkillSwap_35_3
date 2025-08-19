import React from 'react';
import { ButtonProps } from './types';
import styles from './Button.module.css';
import cn from 'classnames';
import { Icon } from '@/shared/ui/Icon';

export const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  onClick,
  className = '',
  htmlType = 'button',
  icon,
  iconName,
  iconSize = 24,
  iconPosition = 'left',
  fullWidth = false,
  children,
  disabled,
  ...rest
}) => {
  const handleClick = (e: React.SyntheticEvent) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const buttonClasses = cn(
    styles.button,
    styles[`button_type_${type}`],
    styles[`button_size_${size}`],
    {
      [styles.button_fullWidth]: fullWidth,
      [styles.button_disabled]: disabled,
      [styles.button_withIcon]: !!icon || !!iconName
    },
    className
  );

  const renderContent = () => {
    return (
      <>
        {iconName && iconPosition === 'left' && (
          <span
            className={cn(
              styles.button__icon,
              styles.button__icon_position_left
            )}
          >
            <Icon name={iconName} size={iconSize} />
          </span>
        )}
        {icon && !iconName && iconPosition === 'left' && (
          <span
            className={cn(
              styles.button__icon,
              styles.button__icon_position_left
            )}
          >
            {icon}
          </span>
        )}

        <span className={styles.button__content}>{children}</span>

        {iconName && iconPosition === 'right' && (
          <span
            className={cn(
              styles.button__icon,
              styles.button__icon_position_right
            )}
          >
            <Icon name={iconName} size={iconSize} />
          </span>
        )}
        {icon && !iconName && iconPosition === 'right' && (
          <span
            className={cn(
              styles.button__icon,
              styles.button__icon_position_right
            )}
          >
            {icon}
          </span>
        )}
      </>
    );
  };

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      type={htmlType}
      {...rest}
    >
      {renderContent()}
    </button>
  );
};
