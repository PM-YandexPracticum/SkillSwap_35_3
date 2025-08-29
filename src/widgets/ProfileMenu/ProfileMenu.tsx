import { Icon } from '@/shared/ui';
import styles from './ProfileMenu.module.css';
import { NavLink } from 'react-router-dom';

export const ProfileMenu = () => (
  <div className={styles['profile-menu']}>
    <NavLink
      to={'/applications'}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
      end
    >
      <Icon name={'request-icon'} size={24} />
      Заявки
    </NavLink>
    <NavLink
      to={'/exchanges'}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      <Icon name={'message-text-icon'} size={24} />
      Мои обмены
    </NavLink>
    <NavLink
      to={'/favorites'}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      <Icon name={'heart-icon'} size={24} />
      Избранное
    </NavLink>
    <NavLink
      to={'/skills'}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      <Icon name={'idea-icon'} size={24} />
      Мои навыки
    </NavLink>
    <NavLink
      to={'/profile'}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''}`
      }
    >
      <Icon name={'user-icon'} size={24} />
      Личные данные
    </NavLink>
  </div>
);
