import ProfileForm from '@/widgets/ProfileForm/ProfileForm';
import { ProfileMenu } from '@/widgets/ProfileMenu';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={styles['profile-page']}>
      <ProfileMenu />
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
