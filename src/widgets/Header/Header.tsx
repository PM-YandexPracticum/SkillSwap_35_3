import { useRef, useState } from 'react';
import {
  Button,
  Icon,
  Input,
  Logo,
  AllSkillsModal,
  Avatar,
  UserMenu
} from '@/shared/ui';
import styles from './Header.module.css';
import { HeaderProps } from './types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useClickOutside, useActionBarButtons } from '@/shared/hooks';
import { ActionBar } from '@/widgets';
import { selectIsAuthenticated, selectAuthUser } from '@/features/auth';
import { logout } from '@/features/auth/slices/authSlice';
import { useSelector } from '@/app/store';
import { pathConstants } from '@/shared/lib/constants/paths';
import { useDispatch } from 'react-redux';

export const Header = ({
  className = '',
  children,
  isSticky = false,
  ariaLabel,
  'data-cy': dataCy
}: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //  refs, клик по которым не должен закрывать модалку
  useClickOutside([modalRef, skillsRef], {
    onClickOutside: () => {
      setIsModalOpen(false);
    }
  });

  useClickOutside([userMenuRef], {
    onClickOutside: () => {
      setIsUserMenuOpen(false);
    }
  });

  const handleSkillsClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAvatarClick = () => setIsUserMenuOpen((prev) => !prev);

  const handleProfileClick = () => {
    navigate('/profile');
    setIsUserMenuOpen(false);
  };

  // Используем селекторы для получения состояния аутентификации
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  // Используем хук для получения конфигурации кнопок
  const actionBarButtons = useActionBarButtons();

  const handleLoginClick = () => {
    navigate(pathConstants.LOGIN, { state: { background: location } });
  };

  const handleRegisterClick = () => {
    navigate(pathConstants.REGISTER, { state: { background: location } });
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
  };

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
          <AllSkillsModal isOpen={isModalOpen} ref={modalRef} />
        </div>
      </div>

      <Input
        placeholder='Искать навык'
        search={true}
        icon={<Icon name='search-icon' fill='#69735D' />}
        iconPosition='left'
        className={styles['header__input']}
      />

      <ActionBar
        buttons={actionBarButtons}
        className={styles['header__action-bar']}
      />

      {isAuthenticated ? (
        <div className={styles['header__user']}>
          <p className={styles['header__user-name']}>{user?.name}</p>
          <Avatar
            src={user?.avatar || ''}
            alt={user?.name || 'Пользователь'}
            className={styles['header__user-avatar']}
            onClick={handleAvatarClick}
          />
          {isUserMenuOpen && (
            <div ref={userMenuRef} className={styles['header__user-menu']}>
              <UserMenu
                onProfile={handleProfileClick}
                onLogout={handleLogoutClick}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles['header__buttons']}>
          <Button type='secondary' size='small' onClick={handleLoginClick}>
            Войти
          </Button>
          <Button type='primary' size='small' onClick={handleRegisterClick}>
            Зарегистрироваться
          </Button>
        </div>
      )}
      {children}
    </header>
  );
};

export default Header;
