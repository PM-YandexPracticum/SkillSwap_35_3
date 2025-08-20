import React, { useState, useEffect } from 'react';
import { Icon } from '@/shared/ui/Icon'; // Импорт компонента Icon для отображения логотипа
import styles from './Logo.module.css';
import { LogoProps } from './types';

const Logo: React.FC<LogoProps> = ({
  size = 40,
  fill,
  color,
  text = 'Skillbox',
  onClick,
  className = ''
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

  const containerClassName = [styles.logoContainer, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName} onClick={onClick}>
      <Icon
        name='logo-icon'
        size={size}
        fill={fill}
        color={iconColor}
        aria-label='Логотип Skillbox'
      />
      <span className={styles.logoText}>{text}</span>
    </div>
  );
};

export default Logo;
