import { DropdownOption } from '@/shared/ui';
import { ChangeEvent } from 'react';

export interface RegisterFormProps {
  data: formData;
  cityOption: DropdownOption[];
  genderOption: DropdownOption[];
  skillsOption: DropdownOption[];
  subSkillsOption: DropdownOption[];
  handleCloseModalFull: () => void;
}

export interface formData {
  avatar: string;
  email: string;
  password: string;
  name: string;
  gender: 'male' | 'female' | 'default';
  date: string;
  city: string;
  skills: string[];
  subSkills: string;
  abilityTitle: string;
  abilityOption: string;
  subAbilityOption: string;
  description: string;
  files: File[];
}

export interface RegisterFormStep1Props {
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: formData;
  nextStep: () => void;
  errors: { [key: string]: string };
  onEmailBlur: () => void;
  isNextDisabled: boolean;
  onBlur: (fiedName: string) => void;
}

export interface RegisterFormStep2Props {
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
  errors: { [key: string]: string };
  isNextDisabled: boolean;
  onBlur: (fiedName: string) => void;
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

export interface RegisterFormStep3Props {
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: formData;
  setFormData: (value: formData | ((prev: formData) => formData)) => void;
  skillsOption: DropdownOption[];
  subSkillsOption: DropdownOption[];
  prevStep: () => void;
  abilityLabel: string;
  subAbilityLabel: string;
  handleCloseModalFull: () => void;
  errors: { [key: string]: string };
  isNextDisabled: boolean;
  onBlur: (fiedName: string) => void;
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}
