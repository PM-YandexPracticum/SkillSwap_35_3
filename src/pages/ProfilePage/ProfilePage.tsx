import { Outlet } from 'react-router-dom';
import { ProfileMenu } from '@/widgets/ProfileMenu';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={styles['profile-page']}>
      <ProfileMenu />
      <div className={styles['profile-content']}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
