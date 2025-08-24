import { ButtonType } from '../Button';
import { IconName } from '../Icon/types';

export interface ActionBarButtonConfig {
  iconName: IconName;
  iconNameActive?: IconName;
  active?: boolean;
  onClick: () => void;
  size?: number;
  type?: ButtonType;
  className?: string;
  ariaLabel: string;
}

export interface ActionBarProps {
  buttons: ActionBarButtonConfig[];
  className?: string;
}
