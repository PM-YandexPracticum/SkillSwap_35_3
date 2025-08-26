import { jsx as _jsx } from "react/jsx-runtime";
import { iconMap } from './Icon.map';
import styles from './Icon.module.css';
export const Icon = ({ name, size = 24, fill, color, className = '', onClick, 'aria-label': ariaLabel }) => {
    const SvgIcon = iconMap[name];
    if (!SvgIcon)
        return null;
    const iconClass = [styles.icon, className].filter(Boolean).join(' ');
    return (_jsx(SvgIcon, { width: size, height: size, fill: fill, color: color, className: iconClass, onClick: onClick, "aria-label": ariaLabel }));
};
