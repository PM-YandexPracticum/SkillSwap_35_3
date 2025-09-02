import { TextareaHTMLAttributes } from 'react';
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
