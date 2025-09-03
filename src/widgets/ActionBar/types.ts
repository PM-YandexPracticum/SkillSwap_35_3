import { ButtonType } from '@/shared/ui/Button/types';
import { IconName } from '@/shared/ui/Icon/types';

export interface ActionBarButtonConfig {
  iconName: IconName;
  iconNameActive?: IconName;
  active?: boolean;
  onClick: () => void;
  size?: number;
  type?: ButtonType;
  className?: string;
  ariaLabel: string;
  path?: string;
}

export interface ActionBarProps {
  buttons: ActionBarButtonConfig[];
  className?: string;
}
