export type IconName =
  | 'request-icon'
  | 'message-text-icon'
  | 'heart-icon'
  | 'idea-icon'
  | 'user-icon';

export interface MenuItem {
  to: string;
  iconName: IconName;
  label: string;
  end?: boolean;
}

export interface ProfileMenuProps {
  className?: string;
}
