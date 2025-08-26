import React, { useRef, useState } from 'react';
import {
  ActionBar,
  Button,
  Icon,
  Input,
  Logo,
  AllSkillsModal
} from '@/shared/ui';
import styles from './Header.module.css';
import { HeaderProps } from './types';
import { Link, useNavigate } from 'react-router-dom';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
// раскомментировать когда готовы userSlice и authSlice
// import { useActionBarButtons } from '@/shared/hooks/useActionBarButtons';
// import { selectIsAuthenticated } from '@/store/auth/authSlice';
// import { selectUser } from '@/store/user/userSlice';
// import { useSelector } from '@/app/store';

export const Header = ({
  className = '',
  children,
  isSticky = false,
  ariaLabel,
  'data-cy': dataCy
}: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  //  refs, клик по которым не должен закрывать модалку
  useClickOutside([modalRef, skillsRef], {
    onClickOutside: () => {
      setIsModalOpen(false);
    }
  });
  const handleSkillsClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Используем селекторы для получения состояния аутентификации
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // const user = useSelector(selectUser);

  // Используем хук для получения конфигурации кнопок
  // const actionBarButtons = useActionBarButtons();

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
          ref={skillsRef}
          onClick={handleSkillsClick}
        >
          <div className={styles['header__skills']}>
            Все навыки
            <Icon
              name={'arrow-down-icon'}
              size={24}
              className={`${styles['header__arrow']} ${isModalOpen ? styles['header__arrow--rotated'] : ''}`}
            />
          </div>
          <div
            className={styles['modal-container']}
            ref={modalRef}
            onClick={handleModalClick}
          >
            <AllSkillsModal isOpen={isModalOpen} />
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
        // в Buttons вставить переменную actionBarButtons когда будут готовы userSlice и authSlice
        buttons={[
          {
            iconName: 'theme-icon',
            type: 'ghost',
            onClick: () => console.log('Смена темы'),
            ariaLabel: 'Смена темы'
          }
        ]}
        className={styles['header__action-bar']}
      />

      {/* Раскомментировать когда будет готова логика авторизации */}
      {/* {isAuthenticated ? (
        <div className={styles['header__user']}>
          <p className={styles['header__user-name']}>{user?.name}</p>
          <Avatar
            src={user?.avatar}
            alt={user?.name || 'Пользователь'}
            className={styles['header__user-avatar']}
          />
        </div>
      ) : ( */}
      <div className={styles['header__buttons']}>
        <Button type='secondary' size='small'>
          Войти
        </Button>
        <Button type='primary' size='small'>
          Зарегистрироваться
        </Button>
      </div>
      {/* )} */}
      {children}
    </header>
  );
};

export default Header;
