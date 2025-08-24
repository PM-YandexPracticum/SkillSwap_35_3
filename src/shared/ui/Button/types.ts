import React, { SyntheticEvent, ReactNode } from 'react';
import { IconName } from '../Icon';

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonHtmlType = 'button' | 'submit' | 'reset';
export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
  type?: ButtonType;
  size?: ButtonSize;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  className?: string;
  htmlType?: ButtonHtmlType;
  icon?: ReactNode;
  iconName?: IconName;
  iconSize?: number;
  iconPosition?: ButtonIconPosition;
  fullWidth?: boolean;
  fill?: string;
  stroke?: string;
}
