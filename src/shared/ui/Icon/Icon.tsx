import { IconProps } from './types';
import { iconMap } from './Icon.map';

import styles from './Icon.module.css';

export const Icon = ({
  name,
  size = 24,
  fill,
  color,
  className = '',
  onClick,
  'aria-label': ariaLabel
}: IconProps) => {
  const SvgIcon = iconMap[name];

  if (!SvgIcon) return null;

  const iconClass = [styles.icon, className].filter(Boolean).join(' ');

  return (
    <SvgIcon
      width={size}
      height={size}
      fill={fill}
      color={color} // для stroke="currentColor"
      className={iconClass}
      onClick={onClick}
      aria-label={ariaLabel}
    />
  );
};
