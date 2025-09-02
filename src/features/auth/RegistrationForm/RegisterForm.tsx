import React, { useState } from 'react';
import { RegisterFormProps } from './type';
import renderStep1 from './RegisterFormStep1';
import renderStep2 from './RegisterFormStep2';
import renderStep3 from './RegisterFormStep3';
import { DropdownOption } from '@/shared/ui';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleOpenModalSuccess = () => {
    setIsModalSuccessOpen(true);
  };

  const handleCloseModalSuccess = () => {
    setIsModalSuccessOpen(false);
  };

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
        return renderStep1({ step, handleChange, formData, nextStep });
      case 2:
        return renderStep2({
          handleChange,
          step,
          formData,
          setFormData,
          genderOption,
          cityOption,
          skillsOption,
          subSkillsOption,
          prevStep,
          nextStep
        });
      case 3:
        return renderStep3({
          step,
          handleChange,
          formData,
          setFormData,
          skillsOption,
          subSkillsOption,
          prevStep,
          handleOpenModal,
          handleCloseModal,
          isModalOpen,
          abilityLabel,
          subAbilityLabel,
          handleOpenModalSuccess,
          handleCloseModalSuccess,
          isModalSuccessOpen,
          handleCloseModalFull
        });
      default:
        return <div>Ошибка: неверный шаг</div>;
    }
  };

  return <>{renderStep()}</>;
};

export default RegisterForm;
