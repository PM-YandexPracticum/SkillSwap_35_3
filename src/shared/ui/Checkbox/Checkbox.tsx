import styles from './Checkbox.module.css';
import { ICheckboxProps } from './types';

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export const Checkbox = ({
  name,
  options,
  values,
  onChange,
  className,
  itemClassName,
  variant = 'check'
}: ICheckboxProps) => {
  const rootCls = cx(
    styles.checkbox,
    variant === 'dash'
      ? styles.checkbox__variant_dash
      : styles.checkbox__variant_check,
    className
  );

  return (
    <div className={rootCls}>
      {options.map((opt) => {
        const isChecked = !!values?.includes(opt.value);
        const itemCls = cx(
          styles.checkbox__item,
          isChecked && styles.checkbox__checked,
          opt.disabled && styles.checkbox__disabled,
          itemClassName
        );

        return (
          <label key={opt.value} className={itemCls}>
            <input
              className={styles.checkbox__input}
              type='checkbox'
              name={name}
              value={opt.value}
              checked={isChecked}
              disabled={opt.disabled}
              onChange={() => onChange?.(opt.value, !isChecked)}
            />
            <span className={styles.checkbox__control} aria-hidden />
            <span className={styles.checkbox__label}>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
};
