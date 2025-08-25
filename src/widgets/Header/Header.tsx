import React, { useState } from 'react';
import { ActionBar, Avatar, Button, Icon, Input, Logo } from '@/shared/ui';
import styles from './Header.module.css';
import { HeaderProps } from './types';
import { Link, useNavigate } from 'react-router-dom';
import { ActionBarButtonConfig } from '@/shared/ui/ActionBar/types';

// моковый хук для изменения isAuthenticated
let useAuthHook = () => {
  return {
    isAuthenticated: true,
    user: {
      id: 5,
      name: 'Максим',
      about: 'Специалист по цифровому рисованию, обучаю Procreate.',
      avatar:
        'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
      city: 'Москва',
      birthDate: '2002-02-14',
      teachingSkillId: 1,
      learningSkillIds: [2, 3, 4, 5]
    }
  };
};

export const setUseAuth = (mockHook: any) => {
  useAuthHook = mockHook;
};

export const Header: React.FC<HeaderProps> = ({
  className = '',
  children,
  isSticky = false,
  ariaLabel,
  'data-cy': dataCy
}) => {
  const [isSkillsHovered, setIsSkillsHovered] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthHook();

  // Логика для ActionBar когда пользователь авторизован или не авторизован
  const baseButtons = [
    {
      iconName: 'theme-icon',
      type: 'ghost',
      onClick: () => console.log('Смена темы'),
      ariaLabel: 'Смена темы'
    }
  ] satisfies ActionBarButtonConfig[];

  const authenticatedButtons = isAuthenticated
    ? ([
        ...baseButtons,
        {
          iconName: 'notification-icon',
          type: 'ghost',
          onClick: () => console.log('Уведомления'),
          ariaLabel: 'Уведомления'
        },
        {
          iconName: 'heart-icon',
          type: 'ghost',
          onClick: () => console.log('Избранное'),
          ariaLabel: 'Избранное'
        }
      ] satisfies ActionBarButtonConfig[])
    : baseButtons;

  return (
    <header
      aria-label={ariaLabel}
      className={`${styles['header']} ${className} ${
        isSticky ? styles['header--sticky'] : ''
      }`}
      data-cy={dataCy}
    >
      <div className={styles['header__logo']} onClick={() => navigate('/')}>
        <Logo />
      </div>

      <div className={styles['header__links']}>
        <Link to='/404' className={styles['header__link']}>
          О проекте
        </Link>
        <div
          className={styles['header__skills-wrapper']}
          onMouseEnter={() => setIsSkillsHovered(true)}
          onMouseLeave={() => setIsSkillsHovered(false)}
        >
          <div className={styles['header__skills']}>
            Все навыки
            <Icon
              name={'arrow-down-icon'}
              size={24}
              className={`${styles['header__arrow']} ${isSkillsHovered ? styles['header__arrow--rotated'] : ''}`}
            />
          </div>
        </div>
      </div>

      <Input
        placeholder='Искать навык'
        search={true}
        icon={<Icon name='search-icon' />}
        iconPosition='left'
        className={styles['header__input']}
      />

      <ActionBar
        buttons={authenticatedButtons}
        className={styles['header__action-bar']}
      />

      {isAuthenticated ? (
        <div className={styles['header__user']}>
          <p className={styles['header__user-name']}>{user.name}</p>
          <Avatar
            src={user.avatar}
            alt={user.name}
            className={styles['header__user-avatar']}
          />
        </div>
      ) : (
        <div className={styles['header__buttons']}>
          <Button type='secondary' size='small'>
            Войти
          </Button>
          <Button type='primary' size='small'>
            Зарегистрироваться
          </Button>
        </div>
      )}
      {children}
    </header>
  );
};

export default Header;
