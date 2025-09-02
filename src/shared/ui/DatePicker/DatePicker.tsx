import React, { useMemo, useRef, useState, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import Calendar from '../../assets/icons/inputs/calendar.svg?react';
import ChevronDown from '../../assets/icons/ui/chevronDown.svg?react';

export interface BirthDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}

export function BirthDatePicker({
  value,
  onChange,
  minDate = new Date(1900, 0, 1),
  maxDate = new Date(),
  disabled,
  className,
}: BirthDatePickerProps) {
  const dpRef = useRef<ReactDatePicker>(null);
  const [temp, setTemp] = useState<Date | null>(value);

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = maxDate.getFullYear(); y >= minDate.getFullYear(); y--) arr.push(y);
    return arr;
  }, [minDate, maxDate]);

  const months = useMemo(
    () => ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    []
  );

  const open = () => dpRef.current?.setOpen?.(true as any);
  const close = () => dpRef.current?.setOpen?.(false as any);

  const confirm = () => {
    onChange(temp ?? null);
    close();
  };

  const cancel = () => {
    setTemp(value ?? null);
    close();
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <ReactDatePicker
        ref={dpRef as any}
        selected={temp ?? value}
        onChange={(d) => setTemp(d as Date | null)}
        onCalendarOpen={() => setTemp(value ?? null)}
        onClickOutside={cancel}
        shouldCloseOnSelect={false}
        showPopperArrow={false}
        popperPlacement="bottom-start"
        dateFormat="dd.MM.yyyy"
        locale={ru}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        customInput={
          <InputWithIcon
            onOpen={open}
            disabled={disabled}
          />
        }
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className={styles.header}>
            <div className={styles.headerControls}>
              <div className={styles.selectWrap}>
                <select
                  className={styles.select}
                  value={date.getMonth()}
                  onChange={(e) => changeMonth(Number(e.target.value))}
                  aria-label="Выбрать месяц"
                >
                  {months.map((m, i) => (
                    <option key={m} value={i}>{m}</option>
                  ))}
                </select>
                <ChevronDown/>
              </div>
              <div className={styles.selectWrap}>
                <select
                  className={styles.select}
                  value={date.getFullYear()}
                  onChange={(e) => changeYear(Number(e.target.value))}
                  aria-label="Выбрать год"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown/>
              </div>
            </div>
          </div>
        )}

        calendarContainer={({ children }) => (
          <div className={styles.calendar}>
            {children}
            <div className={styles.footer}>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={cancel}>
                Отменить
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={confirm}>
                Выбрать
              </button>
            </div>
          </div>
        )}
        dayClassName={() => styles.day}
        weekDayClassName={() => styles.weekday}
        onInputClick={open}
      />
    </div>
  );
}

const InputWithIcon = forwardRef<HTMLInputElement, {
  value?: string;
  onClick?: () => void;
  onOpen?: () => void;
  placeholder?: string;
  
  disabled?: boolean;
}>(({ value, onClick, onOpen, disabled }, ref) => (
  <button
    type="button"
    className={styles.input}
    onClick={(e) => {
      onClick?.();
      onOpen?.();
      e.preventDefault();
    }}
    disabled={disabled}
  >
    <span className={value ? styles.inputValue : styles.inputPlaceholder}>
      {value || 'дд.мм.гггг'}
    </span>
    <Calendar />
    <input ref={ref} value={value} readOnly className={styles.hiddenNativeInput} />
  </button>
));
InputWithIcon.displayName = 'InputWithIcon';