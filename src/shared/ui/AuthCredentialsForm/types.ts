export type AuthOption = 'login' | 'register';

export interface AuthFormProps {
  option: AuthOption;
  email: string;
  password: string;
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onSubmit?: () => void;
  emailError?: string;
  passwordError?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}
