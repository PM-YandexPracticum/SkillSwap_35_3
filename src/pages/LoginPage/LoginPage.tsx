import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './LoginPage.module.css';

import { Title } from '@/shared/ui/Title';
import { LoginForm } from '@/features/auth/LoginForm/LoginForm';

const LoginPage = ({ padded = false }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/profile');
  };

  return (
    <div className={cn(styles.loginpage, padded && styles.padded)}>
      <Title as='h2' size='lg'>
        Вход
      </Title>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
