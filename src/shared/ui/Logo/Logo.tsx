import React, { useState, useEffect } from 'react';
import { Icon } from '@/shared/ui/Icon';
import { Title } from '../Title';
import styles from './Logo.module.css';
import { LogoProps } from './types';

const Logo: React.FC<LogoProps> = ({
  size = 40,
  fill,
  color,
  text = 'Skillswap',
  onClick,
  className = '',
  titleSize = 'lg'
}) => {
  const [accentColor, setAccentColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const buttonColorAccent = rootStyles
      .getPropertyValue('--button-color-accent')
      .trim();
    setAccentColor(buttonColorAccent);
  }, []);

  const iconColor = color || accentColor || 'currentColor';

  const containerClassName = [styles.logo__container, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName} onClick={onClick}>
      <Icon
        name='logo-icon'
        size={size}
        fill={fill}
        color={iconColor}
        aria-label='Логотип Skillswap'
      />
      <Title as='h2' size={titleSize}>
        {text}
      </Title>
    </div>
  );
};

export { Logo };
