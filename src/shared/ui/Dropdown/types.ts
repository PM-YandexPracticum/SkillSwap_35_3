import { IconName } from '../Icon/types';

export interface DropdownOption {
  value: string;
  label: string;
  iconName?: IconName;
  disabled?: boolean;
}

export interface DropdownProps {
  label?: string;
  onBlur?: () => void;
  placeholder?: string;
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  className?: string;
  fullWidth?: boolean;
}
