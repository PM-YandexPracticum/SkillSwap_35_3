export interface RadioFilterProps {
  value: string;
  onChange: (value: string) => void;
  radioList: RadioFilterOption[];
  title?: string;
  name: string;
}

export interface RadioFilterOption {
  value: string;
  label: string;
}
