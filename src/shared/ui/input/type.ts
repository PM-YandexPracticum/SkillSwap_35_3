export interface InputProps {
  type?: string;
  pattern?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  name?: string;
  required?: boolean;
  style?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}