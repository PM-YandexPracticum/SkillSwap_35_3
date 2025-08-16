export interface IRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface IRadioProps {
  name: string;
  options: IRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}