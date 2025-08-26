import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Radio.module.css';
function cx(...parts) {
    return parts.filter(Boolean).join(' ');
}
export const RadioUI = ({ name, options, value, onChange, className, itemClassName }) => {
    return (_jsx("div", { className: cx(styles.radio, className), children: options.map((option) => {
            const isChecked = value === option.value;
            const itemCls = cx(styles.radioItem, isChecked && styles.radioChecked, option.disabled && styles.radioDisabled, itemClassName);
            return (_jsxs("label", { className: itemCls, children: [_jsx("input", { className: styles.radioInput, type: 'radio', name: name, value: option.value, checked: isChecked, disabled: option.disabled, onChange: () => onChange?.(option.value) }), _jsx("span", { className: styles.radioControl, "aria-hidden": true }), _jsx("span", { className: styles.radioLabel, children: option.label })] }, option.value));
        }) }));
};
