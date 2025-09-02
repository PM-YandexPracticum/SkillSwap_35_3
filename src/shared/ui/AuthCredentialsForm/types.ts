import { ReactNode } from 'react';

export type AuthOption = 'login' | 'register';

export interface AuthFormProps {
  option?: AuthOption;
  email: string;
  password: string;
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onSubmit?: () => void;
  emailError?: string;
  passwordError?: string;
  emailLabel?: string;
  passwordLabel?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  submitText?: string;
  passwordHint?: string;
  passwordAutoComplete?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  topContent?: ReactNode;
  children?: ReactNode;
  isFormValid?: boolean;
  bottomContent?: ReactNode;
}
