import React, { useState } from 'react';
import { RegisterFormProps } from './type';
import { DropdownOption } from '@/shared/ui';
import RegisterFormStep3 from './RegisterFormStep3';
import RegisterFormStep2 from './RegisterFormStep2';
import RegisterFormStep1 from './RegisterFormStep1';

const RegisterForm = ({
  data,
  genderOption,
  cityOption,
  skillsOption,
  subSkillsOption,
  handleCloseModalFull
}: RegisterFormProps) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const prevStep = () => setStep((prev) => prev - 1);

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
          />
        );
      default:
        return <div>Ошибка: неверный шаг</div>;
    }
  };

  return <>{renderStep()}</>;
};

export default RegisterForm;
