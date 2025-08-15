import React from 'react';
import { ButtonProps } from './type';
import cn from 'classnames';

export const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  onClick,
  extraClass = '',
  htmlType = 'button',
  icon,
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
    'button',
    `button_type_${type}`,
    `button_size_${size}`,
    {
      'button_full-width': fullWidth,
      button_disabled: disabled,
      'button_with-icon': !!icon
    },
    extraClass
  );

  const renderContent = () => {
    return (
      <>
        {icon && iconPosition === 'left' && (
          <span className='button__icon button__icon_position_left'>
            {icon}
          </span>
        )}
        <span className='button__content'>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className='button__icon button__icon_position_right'>
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
