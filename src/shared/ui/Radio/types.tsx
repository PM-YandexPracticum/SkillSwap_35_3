import React from 'react';

export interface IRadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface IRadioProps {
  name: string;
  options: IRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  itemClassName?: string;
}
