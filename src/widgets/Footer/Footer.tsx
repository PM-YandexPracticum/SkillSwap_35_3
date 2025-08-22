import React from 'react';
import styles from './Footer.module.css
import { FooterProps } from './types';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '@/shared/ui/Logo';

export const Footer: React.FC<FooterProps> = ({ show = true }) => {
  if (!show) {
    return null;
  } 

  const navigate = useNavigate();

  return (
    <footer>
      {/* логотип внутри футера */}
      <div className='footer__logo' onClick={() => navigate('/')}>
        <Logo size={40} />
      </div>

      {/* Блок со ссылками в виде grid */}
      <div className='footer__links-grid'>
        {/* Первая колонка - пустая */}
        <div className='footer__column'></div>

        {/* Вторая колонка - две ссылки */}
        <div className='footer__column'>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              'footer__link' + (isActive ? ' footer__link--active' : '')
            }
          >
            Контакты
          </NavLink>
           <NavLink
            to='/contact'
            className={({ isActive }) =>
              'footer__link' + (isActive ? ' footer__link--active' : '')
            }
          >
            Контакты
          </NavLink>
        </div>

        {/* Третья колонка - две ссылки */}
        <div className='footer__column'>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              'footer__link' + (isActive ? ' footer__link--active' : '')
            }
          >
            Контакты
          </NavLink>
           <NavLink
            to='/contact'
            className={({ isActive }) =>
              'footer__link' + (isActive ? ' footer__link--active' : '')
            }
          >
            Контакты
          </NavLink>
        </div>

        {/* Четвертая колонка - две ссылки */}
        <div className='footer__column'>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              'footer__link' + (isActive ? ' footer__link--active' : '')
            }
          >
            Контакты
          </NavLink>
           <NavLink
            to='/contact'
            className={({ isActive }) =>
              'footer__link' + (isActive ? ' footer__link--active' : '')
            }
          >
            Контакты
          </NavLink>
        </div>
      </div>

      {/* Копирайт */}
      <p className='footer__copyright'>SkillSwap — 2025</p>
    </footer>
  );
};

/*
import React from 'react';
import { Footer } from 'widgets/Footer';

const PageComponent = () => {
  const shouldShowFooter = true; // или логика, которая определяет отображение

  return (
    <div>
      {/* содержимое страницы }
      
      {/* отображаем футер только если нужно }
      <Footer show={shouldShowFooter} />
    </div>
  );
};
*/
