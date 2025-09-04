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
import { useAppDispatch, useSelector } from '@/app/store';
import { selectQuery } from '@/entities/Filters/model/filtersSelectors';
import { setQuery } from '@/entities/Filters/model/filtersSlice';
import { logout } from '@/features/auth/slices/authSlice';

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // закрываем модалку «Все навыки» по клику вне
  useClickOutside([modalRef, skillsRef], {
    onClickOutside: () => setIsModalOpen(false)
  });

  // закрываем меню пользователя по клику вне
  useClickOutside([userMenuRef], {
    onClickOutside: () => setIsUserMenuOpen(false)
  });

  const handleSkillsClick = () => setIsModalOpen((v) => !v);
  const handleAvatarClick = () => setIsUserMenuOpen((v) => !v);
  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    navigate('/profile');
  };
  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
    dispatch(logout());
    navigate('/login');
  };
  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');

  // auth
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  // кнопки экшн-бара
  const actionBarButtons = useActionBarButtons();

  // поиск: связываем инпут в хедере с фильтрами (q) через Redux
  const q = useSelector(selectQuery) ?? '';

  return (
    <header
      aria-label={ariaLabel}
      className={`${styles['header']} ${className} ${isSticky ? styles['header--sticky'] : ''}`}
      data-cy={dataCy}
    >
      <div className={styles['header__logo']} onClick={() => navigate('/')}>
        <Logo />
      </div>

      <div className={styles['header__links']}>
        <Link to='/404' className={styles['header__link']}>
          О проекте
        </Link>

        {/* Кнопка «Все навыки» + модалка */}
        <div
          className={styles['header__skills-wrapper']}
          ref={skillsRef}
          onClick={handleSkillsClick}
        >
          <div className={styles['header__skills']}>
            Все навыки
            <Icon
              name='arrow-down-icon'
              size={24}
              className={`${styles['header__arrow']} ${isModalOpen ? styles['header__arrow--rotated'] : ''}`}
            />
          </div>
          <AllSkillsModal isOpen={isModalOpen} ref={modalRef} />
        </div>
      </div>

      {/* Поисковая строка в хедере: контролируемое значение из Redux */}
      <Input
        placeholder='Искать навык'
        search
        icon={<Icon name='search-icon' fill='#69735D' />}
        iconPosition='left'
        className={styles['header__input']}
        value={q}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        aria-label='Поиск по имени и навыкам'
        data-cy='header-search'
      />

      <ActionBar
        buttons={actionBarButtons}
        className={styles['header__action-bar']}
      />

      {/* Блок авторизации: имя + аватар или кнопки «Войти/Зарегистрироваться» */}
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
