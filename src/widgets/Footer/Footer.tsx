import React from 'react';
import styles from './Footer.module.css';
import { FooterProps } from './types';

import { Link, useNavigate } from 'react-router-dom';
//import { Logo } from '@/shared/ui/Logo'; // Компонент Logo убран
import logo from '@/shared/assets/logo/logo.png'; // Импорт картинки логотипа

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
    cursor: 'default', // всегда по умолчанию
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
      {/* В этом блоке раньше использовался компонент Logo, сейчас используется изображение */}
      <div className={styles['footer__logo']} onClick={() => navigate('/')}>
        <img src={logo} alt='Логотип' height={40} />
      </div>

      {/* Блок с ссылками */}
      <div className={styles['footer__links-grid']}>
        {/* Первая колонка - пустая */}
        <div className={styles['footer__column']}></div>

        {/* Вторая колонка */}
        <div className={styles['footer__column']}>
          <Link to='/404' className={styles['footer__link']}>
            О проекте
          </Link>
          <Link to='/404' className={styles['footer__link']}>
            Все навыки
          </Link>
        </div>

        {/* Третья колонка */}
        <div className={styles['footer__column']}>
          <Link to='/404' className={styles['footer__link']}>
            Контакты
          </Link>
          <Link to='/404' className={styles['footer__link']}>
            Блог
          </Link>
        </div>

        {/* Четвертая колонка */}
        <div className={styles['footer__column']}>
          <Link to='/404' className={styles['footer__link']}>
            Политика конфиденциальности
          </Link>
          <Link to='/404' className={styles['footer__link']}>
            Пользовательское соглашение
          </Link>
        </div>
      </div>

      {/* Копирайт */}
      <p className={styles['footer__copyright']}>SkillSwap — 2025</p>

      {/* Вложенные элементы, если есть */}
      {children}
    </footer>
  );
};
