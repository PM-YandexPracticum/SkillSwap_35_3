import { Icon } from '@/shared/ui';
import styles from './ProfileMenu.module.css';
import { NavLink } from 'react-router-dom';
import { MenuItem } from './types';

const menuItems: MenuItem[] = [
  {
    to: '/profile/applications',
    iconName: 'request-icon',
    label: 'Заявки'
  },
  {
    to: '/profile/exchanges',
    iconName: 'message-text-icon',
    label: 'Мои обмены'
  },
  {
    to: '/profile/favorites',
    iconName: 'heart-icon',
    label: 'Избранное'
  },
  {
    to: '/profile/skills',
    iconName: 'idea-icon',
    label: 'Мои навыки'
  },
  {
    to: '/profile',
    iconName: 'user-icon',
    label: 'Личные данные',
    end: true
  }
];

export const ProfileMenu = () => (
  <div className={styles['profile-menu']}>
    {menuItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.link_active : ''}`
        }
        end={item.end}
      >
        <Icon name={item.iconName} size={24} />
        {item.label}
      </NavLink>
    ))}
  </div>
);
