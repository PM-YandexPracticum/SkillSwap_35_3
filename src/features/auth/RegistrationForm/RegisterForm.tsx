import React, { useState } from 'react';
import { formData, RegisterFormProps } from './type';
import { DropdownOption } from '@/shared/ui';
import RegisterFormStep3 from './RegisterFormStep3';
import RegisterFormStep2 from './RegisterFormStep2';
import RegisterFormStep1 from './RegisterFormStep1';

import { checkEmailThunk } from '@/features/auth/thunks';
import { useSelector, useAppDispatch } from '@/app/store';
import { selectAuthError } from '@/features/auth/selectors/authSelectors';

const RegisterForm = ({
  data,
  genderOption,
  cityOption,
  skillsOption,
  subSkillsOption,
  handleCloseModalFull
}: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const [emailErrorServer, setEmailErrorServer] = useState<string | null>(null);

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<formData>(data);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const serverError = useSelector(selectAuthError);

  const handleEmailBlur = async () => {
    if (!formData.email) return;

    try {
      await dispatch(checkEmailThunk(formData.email)).unwrap();
      setEmailErrorServer(null);
    } catch (err) {
      if (typeof err === 'string') setEmailErrorServer(err);
      else if (err instanceof Error) setEmailErrorServer(err.message);
      else setEmailErrorServer('Ошибка проверки email');
    }
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = 'Пожалуйста, введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Некорректный формат email';

    if (!formData.password) newErrors.password = 'Пожалуйста, введите пароль';
    else if (formData.password.length < 5)
      newErrors.password = 'Пароль должен содержать минимум 5 символов';

    if (emailErrorServer) newErrors.server = emailErrorServer;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isStep1Valid = () => {
    if (!formData.email) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (!formData.password) return false;
    if (formData.password.length < 5) return false;
    if (emailErrorServer) return false;
    return true;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Пожалуйста, введите имя';
    if (!formData.gender) newErrors.gender = 'Пожалуйста, выберите пол';
    if (!formData.date) newErrors.date = 'Пожалуйста, выберите дату рождения';
    if (!formData.city) newErrors.city = 'Пожалуйста, выберите город';
    if (!formData.skills || formData.skills.length === 0)
      newErrors.skills = 'Пожалуйста, выберите хотя бы один навык';
    if (!formData.subSkills || formData.subSkills.length === 0)
      newErrors.subSkills = 'Пожалуйста, выберите подкатегорию навыка';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStep2Valid = () => {
    if (!formData.name) return false;
    if (!formData.gender || formData.gender === 'default') return false;
    if (!formData.date) return false;
    if (!formData.city) return false;
    if (!formData.skills || formData.skills.length === 0) return false;
    if (!formData.subSkills) return false;
    return true;
  };

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.abilityTitle)
      newErrors.abilityTitle = 'Введите название навыка';
    if (!formData.abilityOption)
      newErrors.abilityOption = 'Выберите категорию навыка';
    if (!formData.subAbilityOption)
      newErrors.subAbilityOption = 'Выберите подкатегорию навыка';
    if (!formData.description) newErrors.description = 'Коротко опишите навык';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStep3Valid = () => {
    if (!formData.abilityTitle) return false;
    if (!formData.abilityOption) return false;
    if (!formData.subAbilityOption) return false;
    if (!formData.description) return false;
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const nextStep = () => {
    console.log('serverError in nextStep:', serverError);
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setErrors({});
  };

  const getLabelByValue = (
    value: string,
    options: DropdownOption[]
  ): string => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : 'Неизвестно';
  };

  const abilityLabel = getLabelByValue(formData.abilityOption, skillsOption);

  const subAbilityLabel = getLabelByValue(
    formData.subAbilityOption,
    subSkillsOption
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <RegisterFormStep1
            handleChange={handleChange}
            formData={formData}
            nextStep={nextStep}
            errors={errors}
            onEmailBlur={handleEmailBlur}
            isNextDisabled={!isStep1Valid()}
          />
        );
      case 2:
        return (
          <RegisterFormStep2
            handleChange={handleChange}
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
            cityOption={cityOption}
            genderOption={genderOption}
            skillsOption={skillsOption}
            subSkillsOption={subSkillsOption}
            setFormData={setFormData}
            errors={errors}
            isNextDisabled={!isStep2Valid()}
          />
        );
      case 3:
        return (
          <RegisterFormStep3
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
            skillsOption={skillsOption}
            subSkillsOption={subSkillsOption}
            prevStep={prevStep}
            abilityLabel={abilityLabel}
            subAbilityLabel={subAbilityLabel}
            handleCloseModalFull={handleCloseModalFull}
            errors={errors}
            isNextDisabled={!isStep3Valid()}
          />
        );
      default:
        return <div>Ошибка: неверный шаг</div>;
    }
  };

  return <>{renderStep()}</>;
};

export default RegisterForm;
