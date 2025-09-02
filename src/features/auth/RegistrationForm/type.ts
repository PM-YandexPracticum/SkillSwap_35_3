import { DropdownOption } from '@/shared/ui';
import { ChangeEvent } from 'react';

export interface RegisterFormProps {
  data: formData;
  cityOption: DropdownOption[];
  genderOption: DropdownOption[];
  skillsOption: DropdownOption[];
  subSkillsOption: DropdownOption[];
  handleCloseModalFull: () => void
}

export interface formData {
  email: string;
  password: string;
  name: string;
  gender: string;
  date: string;
  city: string;
  skills: string[];
  subSkills: string[];
  abilityTitle: string;
  abilityOption: string;
  subAbilityOption: string;
  description: string;
  files: File[];
}

export interface RegisterFormStep1Props {
  step: number;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: formData;
  nextStep: () => void;
}

export interface RegisterFormStep2Props {
  step: number;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: formData;
  nextStep: () => void;
  prevStep: () => void;
  cityOption: DropdownOption[];
  genderOption: DropdownOption[];
  skillsOption: DropdownOption[];
  subSkillsOption: DropdownOption[];
  setFormData: (value: formData | ((prev: formData) => formData)) => void;
}

export interface RegisterFormStep3Props {
  step: number;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: formData;
  setFormData: (value: formData | ((prev: formData) => formData)) => void;
  skillsOption: DropdownOption[];
  subSkillsOption: DropdownOption[];
  prevStep: () => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  abilityLabel: string;
  subAbilityLabel: string;
  handleOpenModalSuccess: () => void;
  handleCloseModalSuccess: () => void;
  isModalSuccessOpen: boolean;
  handleCloseModalFull: () => void
}
