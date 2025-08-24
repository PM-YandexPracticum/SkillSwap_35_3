export interface RadioFilterProps {
  value: string;
  onChange: (radioItem: string) => void;
  radioList: string[];
  title?: string;
  name: string;
}
