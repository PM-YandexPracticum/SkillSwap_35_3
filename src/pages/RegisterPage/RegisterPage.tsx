import RegisterForm from "@/features/auth/RegistrationForm/RegisterForm"
import { FullScreenModal } from "@/shared/ui"
import { RegisterPageProps } from "./type"

const RegisterPage = ({isOpen, handleClose, formData, city, gender, skills, subSkills}: RegisterPageProps) => {

   return (
   <FullScreenModal isOpen={isOpen} onClose={handleClose} closeOnEsc={false}>
        <RegisterForm data={formData} cityOption={city} genderOption={gender} skillsOption={skills} subSkillsOption={subSkills} handleCloseModalFull={handleClose}></RegisterForm>
    </FullScreenModal>
    )
}

export default RegisterPage