export interface SliderProps {
  className?: string;
  ariaLabel: string;
  visible: number;
  children: React.ReactNode;
  buttonPosition?: 'edges' | 'inside';
}
