import React from "react";
import styles from "./Checkbox.module.css";
import { ICheckboxProps } from "./types";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const CheckboxUI: React.FC<ICheckboxProps> = ({
  name,
  options,
  values,
  onChange,
  className,
  itemClassName,
  variant = "check",
}) => {
  const rootCls = cx(
    styles.checkbox,
    variant === "dash" ? styles.checkboxVariantDash : styles.checkboxVariantCheck,
    className
  );

  return (
    <div className={rootCls}>
      {options.map(opt => {
        const isChecked = !!values?.includes(opt.value);
        const itemCls = cx(
          styles.checkboxItem,
          isChecked && styles.checkboxChecked,
          opt.disabled && styles.checkboxDisabled,
          itemClassName
        );

        return (
          <label key={opt.value} className={itemCls}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              name={name}
              value={opt.value}
              checked={isChecked}
              disabled={opt.disabled}
              onChange={() => onChange?.(opt.value, !isChecked)}
            />
            <span className={styles.checkboxControl} aria-hidden />
            <span className={styles.checkboxLabel}>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
};