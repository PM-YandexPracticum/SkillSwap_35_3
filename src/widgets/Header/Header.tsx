import React, { useRef, useState } from 'react';
import { Button, Icon, Input, Logo, AllSkillsModal, Avatar } from '@/shared/ui';
import styles from './Header.module.css';
import { HeaderProps } from './types';
import { Link, useNavigate } from 'react-router-dom';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { ActionBar } from '../ActionBar';
import { useActionBarButtons } from '@/shared/hooks/useActionBarButtons';
import { selectIsAuthenticated, selectAuthUser } from '@/features/auth';
import { useAppDispatch, useSelector } from '@/app/store';
import { selectQuery } from '@/entities/Filters/model/filtersSelectors';
import { setQuery } from '@/entities/Filters/model/filtersSlice';

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

  // закрываем модалку «Все навыки» по клику вне
  useClickOutside([modalRef, skillsRef], {
    onClickOutside: () => {
      setIsModalOpen(false);
    }
  });
  const handleSkillsClick = () => setIsModalOpen((v) => !v);

  // auth
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  // кнопки экшн-бара
  const actionBarButtons = useActionBarButtons();

  // поиск: связываем инпут в хедере с фильтрами (q) через Redux
  const dispatch = useAppDispatch();
  const q = useSelector(selectQuery);

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
        <div className={styles['header__skills-wrapper']} ref={skillsRef} onClick={handleSkillsClick}>
          <div className={styles['header__skills']}>
            Все навыки
            <Icon
              name='arrow-down-icon'
              size={24}
              className={`${styles['header__arrow']} ${isModalOpen ? styles['header__arrow--rotated'] : ''}`}
            />
          </div>
          <div className={styles['modal-container']} ref={modalRef}>
            <AllSkillsModal isOpen={isModalOpen} />
          </div>
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

      <ActionBar buttons={actionBarButtons} className={styles['header__action-bar']} />

      {/* Блок авторизации: имя + аватар или кнопки «Войти/Зарегистрироваться» */}
      {isAuthenticated ? (
        <div className={styles['header__user']}>
          <p className={styles['header__user-name']}>{user?.name}</p>
          <Avatar
            src={user?.avatar || ''}
            alt={user?.name || 'Пользователь'}
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
