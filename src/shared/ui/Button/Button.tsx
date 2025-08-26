import React from 'react';
import { ButtonProps } from './types';
import styles from './Button.module.css';
import cn from 'classnames';
import { Icon } from '@/shared/ui';

export const Button = ({
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
  fill,
  stroke,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  const handleClick = (e: React.SyntheticEvent) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const hasIconOnly = (!children || children === '') && (icon || iconName);
  const hasContent = children && children !== '';

  const buttonClasses = cn(
    styles.button,
    styles[`button_type_${type}`],
    styles[`button_size_${size}`],
    {
      [styles.button_fullWidth]: fullWidth,
      [styles.button_disabled]: disabled,
      [styles.button_withIcon]: hasContent && (icon || iconName),
      [styles.button_iconOnly]: hasIconOnly
    },
    className
  );

  const renderIcon = () => {
    if (iconName) {
      return (
        <Icon name={iconName} size={iconSize} fill={fill} color={stroke} />
      );
    }
    if (icon) {
      return icon;
    }
    return null;
  };

  const renderContent = () => {
    if (hasIconOnly) {
      return renderIcon();
    }

    return (
      <>
        {(iconName || icon) && iconPosition === 'left' && (
          <span
            className={cn(
              styles.button__icon,
              styles.button__icon_position_left
            )}
          >
            {renderIcon()}
          </span>
        )}

        {hasContent && (
          <span className={styles.button__content}>{children}</span>
        )}

        {(iconName || icon) && iconPosition === 'right' && (
          <span
            className={cn(
              styles.button__icon,
              styles.button__icon_position_right
            )}
          >
            {renderIcon()}
          </span>
        )}
      </>
    );
  };

  return (
    <button
      type={htmlType}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {renderContent()}
    </button>
  );
};
