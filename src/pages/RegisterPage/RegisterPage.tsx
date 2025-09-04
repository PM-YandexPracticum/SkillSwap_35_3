import RegisterForm from '@/features/auth/RegistrationForm/RegisterForm';
import { RegisterPageProps } from './type';
import styles from './RegisterPage.module.css';
import cn from 'classnames';

const RegisterPage = ({
  handleClose,
  formData,
  city,
  gender,
  skills,
  subSkills,
  padded = false
}: RegisterPageProps) => {
  return (
    <div className={cn(styles.registerpage, padded && styles.padded)}>
      <RegisterForm
        data={formData}
        cityOption={city}
        genderOption={gender}
        skillsOption={skills}
        subSkillsOption={subSkills}
        handleCloseModalFull={handleClose}
      ></RegisterForm>
    </div>
  );
};

export default RegisterPage;
