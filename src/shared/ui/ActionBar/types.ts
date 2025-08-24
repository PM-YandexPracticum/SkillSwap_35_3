import { ButtonType } from '../Button';
import { IconName } from '../Icon/types';

export interface ButtonConfig {
  iconName: IconName;
  iconNameActive?: IconName;
  active?: boolean;
  onClick?: () => void;
  size?: number;
  type?: ButtonType;
}

export interface ActionBarProps {
  buttons?: ButtonConfig[];
}
