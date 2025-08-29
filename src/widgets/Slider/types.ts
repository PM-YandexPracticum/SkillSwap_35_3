export interface SliderProps {
  className?: string;
  ariaLabel: string;
  ariaLabelNext?: string;
  ariaLabelPrev?: string;
  visible: number;
  children: React.ReactNode;
  buttonPosition?: 'edges' | 'inside';
}
