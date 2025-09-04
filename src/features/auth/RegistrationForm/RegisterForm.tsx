import React, { useState, useEffect } from 'react';
import { formData, RegisterFormProps } from './type';
import { DropdownOption } from '@/shared/ui';
import RegisterFormStep3 from './RegisterFormStep3';
import RegisterFormStep2 from './RegisterFormStep2';
import RegisterFormStep1 from './RegisterFormStep1';
import { checkEmailThunk } from '@/features/auth/thunks';
import { useAppDispatch } from '@/app/store';

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
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (step === 1) {
      validateStep1Dynamic();
    }
  }, [formData.email, formData.password, emailErrorServer, step]);

  useEffect(() => {
    if (step === 2) {
      validateStep2Dynamic();
    }
  }, [
    formData.name,
    formData.gender,
    formData.date,
    formData.city,
    formData.skills,
    formData.subSkills,
    step
  ]);

  useEffect(() => {
    if (step === 3) {
      validateStep3Dynamic();
    }
  }, [
    formData.abilityTitle,
    formData.abilityOption,
    formData.subAbilityOption,
    formData.description,
    step
  ]);

  const handleEmailBlur = async () => {
    if (!formData.email || errors.email) return;

    try {
      await dispatch(checkEmailThunk(formData.email)).unwrap();
      setEmailErrorServer(null);
      // Очищаем серверную ошибку из errors
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.server;
        return newErrors;
      });
    } catch (err) {
      const errorMessage =
        typeof err === 'string'
          ? err
          : err instanceof Error
            ? err.message
            : 'Ошибка проверки email';
      setEmailErrorServer(errorMessage);
    }
  };

  const validateStep1Dynamic = () => {
    const newErrors: { [key: string]: string } = {};

    if (touched.email || errors.email) {
      if (!formData.email) {
        newErrors.email = 'Пожалуйста, введите email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Некорректный формат email';
      }
    }

    if (touched.password || errors.password) {
      if (!formData.password) {
        newErrors.password = 'Пожалуйста, введите пароль';
      } else if (formData.password.length < 5) {
        newErrors.password = 'Пароль должен содержать минимум 5 символов';
      }
    }

    if (emailErrorServer) {
      newErrors.server = emailErrorServer;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
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
    setTouched((prev) => ({ ...prev, email: true, password: true }));

    return Object.keys(newErrors).length === 0;
  };

  const validateStep2Dynamic = () => {
    const newErrors: { [key: string]: string } = {};

    if (touched.name || errors.name) {
      if (!formData.name) newErrors.name = 'Пожалуйста, введите имя';
    }

    if (touched.gender || errors.gender) {
      if (!formData.gender) newErrors.gender = 'Пожалуйста, выберите пол';
    }

    if (touched.date || errors.date) {
      if (!formData.date) newErrors.date = 'Пожалуйста, выберите дату рождения';
    }

    if (touched.city || errors.city) {
      if (!formData.city) newErrors.city = 'Пожалуйста, выберите город';
    }

    if (touched.skills || errors.skills) {
      if (!formData.skills || formData.skills.length === 0)
        newErrors.skills = 'Пожалуйста, выберите хотя бы один навык';
    }

    if (touched.subSkills || errors.subSkills) {
      if (!formData.subSkills || formData.subSkills.length === 0)
        newErrors.subSkills = 'Пожалуйста, выберите подкатегорию навыка';
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
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
    setTouched((prev) => ({
      ...prev,
      name: true,
      gender: true,
      date: true,
      city: true,
      skills: true,
      subSkills: true
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validateStep3Dynamic = () => {
    const newErrors: { [key: string]: string } = {};

    if (touched.abilityTitle || errors.abilityTitle) {
      if (!formData.abilityTitle)
        newErrors.abilityTitle = 'Введите название навыка';
    }

    if (touched.abilityOption || errors.abilityOption) {
      if (!formData.abilityOption)
        newErrors.abilityOption = 'Выберите категорию навыка';
    }

    if (touched.subAbilityOption || errors.subAbilityOption) {
      if (!formData.subAbilityOption)
        newErrors.subAbilityOption = 'Выберите подкатегорию навыка';
    }

    if (touched.description || errors.description) {
      if (!formData.description)
        newErrors.description = 'Коротко опишите навык';
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
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
    setTouched((prev) => ({
      ...prev,
      abilityTitle: true,
      abilityOption: true,
      subAbilityOption: true,
      description: true
    }));

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

  const isStep2Valid = () => {
    if (!formData.name) return false;
    if (!formData.gender || formData.gender === 'default') return false;
    if (!formData.date) return false;
    if (!formData.city) return false;
    if (!formData.skills || formData.skills.length === 0) return false;
    if (!formData.subSkills) return false;
    return true;
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

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'email' && emailErrorServer) {
      setEmailErrorServer(null);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.server;
        return newErrors;
      });
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setStep((prev) => prev + 1);
    // Сбрасываем touched при переходе на следующий шаг
    setTouched({});
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setErrors({});
    setTouched({});
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
            onBlur={handleBlur}
            onEmailBlur={handleEmailBlur}
            isNextDisabled={!isStep1Valid()}
          />
        );
      case 2:
        return (
          <RegisterFormStep2
            setErrors={setErrors}
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
            onBlur={handleBlur}
            isNextDisabled={!isStep2Valid()}
          />
        );
      case 3:
        return (
          <RegisterFormStep3
            setErrors={setErrors}
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
            onBlur={handleBlur}
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
