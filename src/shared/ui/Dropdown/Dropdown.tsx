import { useState, useEffect, useRef } from 'react';
import type { DropdownProps } from './types';
import styles from './Dropdown.module.css';
import { Icon, IconName, Checkbox } from '@/shared/ui';
import cn from 'classnames';

const ARROW_DOWN: IconName = 'arrow-down-icon';
let globalZIndex = 1000;
export const Dropdown = ({
  label = '',
  placeholder = '',
  options,
  value,
  onChange,
  multiple = false,
  className = '',
  fullWidth = false
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setZIndex(1);
      }
    }

    if (open) {
      globalZIndex += 1;
      setZIndex(globalZIndex);
    } else {
      if (zIndex === globalZIndex) {
        globalZIndex = Math.max(1000, globalZIndex - 1);
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      if (zIndex === globalZIndex) {
        globalZIndex = Math.max(1000, globalZIndex - 1);
      }
    };
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

  const handleToggle = () => {
    const newOpenState = !open;
    setOpen(newOpenState);

    if (newOpenState) {
      globalZIndex += 1;
      setZIndex(globalZIndex);
    }
  };

  return (
    <div
      className={cn(styles.dropdown, className, {
        [styles.dropdown__fullWidth]: fullWidth
      })}
      ref={ref}
      style={{ zIndex }}
    >
      {label && <label className={styles.dropdown__label}>{label}</label>}

      <div
        className={`${styles.dropdown__field} ${open ? styles['dropdown__field--opened'] : ''}`}
        tabIndex={0}
        onClick={handleToggle}
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
        <div
          className={styles.dropdown__menu}
          role='listbox'
          style={{ zIndex: zIndex + 1 }}
        >
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
