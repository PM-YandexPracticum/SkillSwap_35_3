import React from 'react';
import styles from './Radio.module.css';
import { IRadioProps } from './types';

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(' ');
}

export const RadioUI: React.FC<IRadioProps> = ({
  name,
  options,
  value,
  onChange,
  className,
  itemClassName
}) => {
  return (
    <div className={cx(styles.radio, className)}>
      {options.map((option) => {
        const isChecked = value === option.value;

        const itemCls = cx(
          styles.radioItem,
          isChecked && styles.radioChecked,
          option.disabled && styles.radioDisabled,
          itemClassName
        );

        return (
          <label key={option.value} className={itemCls}>
            <input
              className={styles.radioInput}
              type='radio'
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={option.disabled}
              onChange={() => onChange?.(option.value)}
            />
            <span className={styles.radioControl} aria-hidden />
            <span className={styles.radioLabel}>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};
