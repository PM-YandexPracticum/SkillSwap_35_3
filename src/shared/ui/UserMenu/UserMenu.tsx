import { Button } from '@/shared/ui';
import { UserMenuProps } from './types';
import styles from './UserMenu.module.css';

export const UserMenu = ({ onProfile, onLogout }: UserMenuProps) => {
  return (
    <nav className={styles['user-menu']} aria-label='Меню пользователя'>
      <Button
        className={styles['user-menu__item']}
        onClick={onProfile}
        type='tertiary'
        size='small'
      >
        Личный кабинет
      </Button>
      <Button
        className={styles['user-menu__item']}
        onClick={onLogout}
        type='tertiary'
        iconName='logout-icon'
        iconPosition='right'
        size='small'
      >
        Выйти из аккаунта
      </Button>
    </nav>
  );
};
