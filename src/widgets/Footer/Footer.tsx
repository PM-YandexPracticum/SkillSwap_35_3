import React from 'react';
import styles from './Footer.module.css'; // путь к файлу стилей
import { FooterProps } from './types';

import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '@/shared/ui/Logo';

export const Footer: React.FC<FooterProps> = ({
  show = true,
  className = '',
  style,
  children,
  isSticky = false,
  backgroundColor,
  height,
  padding,
  onClick,
  id,
  ariaLabel,
  'data-cy': dataCy
}) => {
  if (!show) {
    return null;
  }

  const navigate = useNavigate();

  // Объединяем стили
  const footerStyle: React.CSSProperties = {
    backgroundColor,
    height,
    padding,
    position: isSticky ? 'sticky' : undefined,
    bottom: isSticky ? 0 : undefined,
    cursor: onClick ? 'pointer' : undefined,
    ...style
  };

  return (
    <footer
      id={id}
      aria-label={ariaLabel}
      className={`${styles['footer']} ${className}`}
      style={footerStyle}
      onClick={onClick}
      data-cy={dataCy}
    >
      {/* Логотип */}
      <div className={styles['footer__logo']} onClick={() => navigate('/')}>
        <Logo size={40} />
      </div>

      {/* Блок с ссылками */}
      <div className={styles['footer__links-grid']}>
        {/* Первая колонка - пустая */}
        <div className={styles['footer__column']}></div>

        {/* Вторая колонка */}
        <div className={styles['footer__column']}>
          <NavLink to='/contact' className={styles['footer__link']}>
            О проекте
          </NavLink>
          <NavLink to='/about' className={styles['footer__link']}>
            Все навыки
          </NavLink>
        </div>

        {/* Третья колонка */}
        <div className={styles['footer__column']}>
          <NavLink to='/contact' className={styles['footer__link']}>
            Контакты
          </NavLink>
          <NavLink to='/about' className={styles['footer__link']}>
            Блог
          </NavLink>
        </div>

        {/* Четвертая колонка */}
        <div className={styles['footer__column']}>
          <NavLink to='/contact' className={styles['footer__link']}>
            Политика конфиденциальности
          </NavLink>
          <NavLink to='/about' className={styles['footer__link']}>
            Пользовательское соглашение
          </NavLink>
        </div>
      </div>

      {/* Копирайт */}
      <p className={styles['footer__copyright']}>SkillSwap — 2025</p>

      {/* Вложенные элементы, если есть */}
      {children}
    </footer>
  );
};
