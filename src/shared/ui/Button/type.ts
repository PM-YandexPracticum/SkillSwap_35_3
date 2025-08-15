import React, { SyntheticEvent, ReactNode } from 'react';

export type ButtonType = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonHtmlType = 'button' | 'submit' | 'reset';
export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
  type?: ButtonType;
  size?: ButtonSize;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  extraClass?: string;
  htmlType?: ButtonHtmlType;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition;
  fullWidth?: boolean;
}
