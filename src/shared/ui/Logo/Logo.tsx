import LogoSvg from '@/shared/assets/logo/logo.svg?react';
import styles from './Logo.module.css';
import { LogoProps } from './types';

export const Logo = ({ size = 160, onClick, className = '' }: LogoProps) => {
  const containerClassName = [styles.logo__container, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName} onClick={onClick}>
      <LogoSvg width={size} aria-label='Логотип SkillSwap' />
    </div>
  );
};
