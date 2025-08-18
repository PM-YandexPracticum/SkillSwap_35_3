import React from 'react';

export type TCheckboxVariant = 'check' | 'dash';

export interface ICheckboxOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface ICheckboxProps {
  name: string;
  options: ICheckboxOption[];
  values?: string[];
  onChange?: (value: string, nextChecked: boolean) => void;
  className?: string;
  itemClassName?: string;
  variant?: TCheckboxVariant;
}
