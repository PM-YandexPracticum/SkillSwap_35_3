import { DropdownOption } from '@/shared/ui';
import RegisterForm from './RegisterForm';
import { useState } from 'react';
import { formData } from './type';

export default {
  title: 'UI/RegisterForm',
  component: RegisterForm
};

const [, setIsOpen] = useState(false);

export const Register = () => {
  const formData: formData = {
    email: '',
    avatar: '',
    password: '',
    name: '',
    gender: 'male',
    date: '',
    city: '',
    skills: [],
    subSkills: '',
    abilityTitle: '',
    abilityOption: '',
    subAbilityOption: '',
    description: '',
    files: []
  };

  const genderOptions: DropdownOption[] = [
    { value: 'Не указан', label: 'Не указан' },
    { value: 'male', label: 'Мужской' },
    { value: 'famele', label: 'Женский' }
  ];

  const cities: DropdownOption[] = [
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'samara', label: 'Самара' },
    { value: 'saratov', label: 'Саратов' }
  ];

  const categories: DropdownOption[] = [
    { value: 'business', label: 'Бизнес и карьера' },
    { value: 'creativity', label: 'Творчество и искусство' },
    { value: 'languages', label: 'Иностранные языки' },
    { value: 'health', label: 'Здоровье и лайфстайл' },
    { value: 'home', label: 'Дом и уют' }
  ];

  const subCategories: DropdownOption[] = [
    { value: 'drawing', label: 'Рисование и иллюстрация' },
    { value: 'photography', label: 'Фотография' },
    { value: 'videoEditing', label: 'Видеомонтаж' },
    { value: 'musicSound', label: 'Музыка и звук' },
    { value: 'acting', label: 'Актёрское мастерство' },
    { value: 'creativeWriting', label: 'Креативное письмо' },
    { value: 'artTherapy', label: 'Арт-терапия' },
    { value: 'decorDIY', label: 'Декор и DIY' }
  ];

  return (
    <RegisterForm
      data={formData}
      cityOption={cities}
      genderOption={genderOptions}
      skillsOption={categories}
      subSkillsOption={subCategories}
      handleCloseModalFull={() => setIsOpen(false)}
    />
  );
};
