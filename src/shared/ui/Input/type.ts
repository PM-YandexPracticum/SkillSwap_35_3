export interface InputProps {
  type?: string;
  pattern?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  name?: string;
  required?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right'
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}