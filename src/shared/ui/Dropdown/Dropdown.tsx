import { useState, useEffect, useRef } from 'react';
import type { DropdownProps } from './types';
import styles from './Dropdown.module.css';
import { Icon, IconName, Checkbox } from '@/shared/ui';

const ARROW_DOWN: IconName = 'arrow-down-icon';

export const Dropdown = ({
  label = '',
  placeholder = '',
  options,
  value,
  onChange,
  multiple = false
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const selectedLabels = multiple
    ? options
        .filter((o) => Array.isArray(value) && value.includes(o.value))
        .map((o) => o.label)
        .join(', ')
    : options.find((o) => o.value === value)?.label || '';

  const handleSingleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const handleCheckboxChange = (val: string, checked: boolean) => {
    if (!Array.isArray(value)) return;
    if (checked) {
      onChange([...value, val]);
    } else {
      onChange(value.filter((v) => v !== val));
    }
  };

  return (
    <div className={styles.dropdown} ref={ref}>
      {label && <label className={styles.dropdown__label}>{label}</label>}

      <div
        className={`${styles.dropdown__field} ${open ? styles['dropdown__field--opened'] : ''}`}
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        role='combobox'
        aria-expanded={open}
        aria-haspopup='listbox'
      >
        <span
          className={styles.dropdown__selected}
          data-placeholder={placeholder}
        >
          {multiple
            ? Array.isArray(value) && value.length
              ? selectedLabels
              : ''
            : value
              ? selectedLabels
              : ''}
        </span>
        <Icon
          name={ARROW_DOWN}
          size={24}
          className={`${styles.dropdown__arrow} ${open ? styles['dropdown__arrow--rotated'] : ''}`}
        />
      </div>

      {open && (
        <div className={styles.dropdown__menu} role='listbox'>
          {multiple ? (
            <Checkbox
              name='dropdown-checkbox'
              options={options}
              values={Array.isArray(value) ? value : []}
              onChange={handleCheckboxChange}
              className={styles['dropdown__checkbox-block']}
              itemClassName={styles['dropdown__checkbox-item']}
            />
          ) : (
            options.map((opt) => (
              <div
                key={opt.value}
                className={`${styles.dropdown__option} ${opt.value === value ? styles['dropdown__option--selected'] : ''}`}
                tabIndex={0}
                role='option'
                aria-selected={opt.value === value}
                onClick={() => handleSingleSelect(opt.value)}
              >
                {opt.iconName && (
                  <Icon
                    name={opt.iconName}
                    size={24}
                    className={styles.dropdown__icon}
                  />
                )}
                <span>{opt.label}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
