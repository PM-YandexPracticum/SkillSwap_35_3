import styles from './Radio.module.css';
import { IRadioProps } from './types';

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(' ');
}

export const RadioUI = ({
  name,
  options,
  value,
  onChange,
  className,
  itemClassName
}: IRadioProps) => {
  return (
    <div className={cx(styles.radio, className)}>
      {options.map((option) => {
        const isChecked = value === option.value;

        const itemCls = cx(
          styles.radio__item,
          isChecked && styles.radio__checked,
          option.disabled && styles.radio__disabled,
          itemClassName
        );

        return (
          <label key={option.value} className={itemCls}>
            <input
              className={styles.radio__input}
              type='radio'
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={option.disabled}
              onChange={() => onChange?.(option.value)}
            />
            <span className={styles.radio__control} aria-hidden />
            <span className={styles.radio__label}>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};
