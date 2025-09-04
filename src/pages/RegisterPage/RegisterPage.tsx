import RegisterForm from '@/features/auth/RegistrationForm/RegisterForm';
import { RegisterPageProps } from './type';

const RegisterPage = ({
  handleClose,
  formData,
  city,
  gender,
  skills,
  subSkills
}: RegisterPageProps) => {
  return (
    <RegisterForm
      data={formData}
      cityOption={city}
      genderOption={gender}
      skillsOption={skills}
      subSkillsOption={subSkills}
      handleCloseModalFull={handleClose}
    ></RegisterForm>
  );
};

export default RegisterPage;
