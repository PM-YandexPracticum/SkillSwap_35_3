import React, { useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import clsx from 'clsx';
import styles from './DatePicker.module.css';
import ChevronDown from '../../assets/icons/ui/chevron-down.svg?react';
import { InputProps } from '@/shared/ui/Input/type';
import { Input } from '@/shared/ui/Input/input';
import { Icon } from '../Icon';

type DatePickerRef = ReactDatePicker & { setOpen: (open: boolean) => void };

export interface BirthDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  popperClassName?: string;
}

export function BirthDatePicker({
  value,
  onChange,
  minDate = new Date(1900, 0, 1),
  maxDate = new Date(),
  disabled,
  className,
  inputClassName,
  popperClassName,
  placeholder = 'дд.мм.гггг'
}: BirthDatePickerProps) {
  const dpRef = useRef<DatePickerRef | null>(null);
  const [temp, setTemp] = useState<Date | null>(value ?? null);

  useEffect(() => {
    setTemp(value ?? null);
  }, [value]);

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = maxDate.getFullYear(); y >= minDate.getFullYear(); y--)
      arr.push(y);
    return arr;
  }, [minDate, maxDate]);

  const months = useMemo(
    () => [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ],
    []
  );

  const open = () => dpRef.current?.setOpen(true);
  const close = () => dpRef.current?.setOpen(false);

  const confirm = () => {
    onChange(temp ?? null);
    close();
  };

  const cancel = () => {
    setTemp(value ?? null);
    close();
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <ReactDatePicker
        ref={dpRef as unknown as React.RefObject<DatePickerRef>}
        selected={temp ?? value ?? null}
        onChange={(d) => setTemp((d as Date) ?? null)}
        onCalendarOpen={() => setTemp(value ?? null)}
        onClickOutside={cancel}
        shouldCloseOnSelect={false}
        showPopperArrow={false}
        popperPlacement='bottom-start'
        dateFormat='dd.MM.yyyy'
        locale={ru}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        placeholderText={placeholder}
        customInput={
          <PickerInputAdapter className={clsx(styles.input, inputClassName)} />
        }
        popperClassName={clsx(styles.popper, popperClassName)}
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className={styles.header}>
            <div className={styles.headerControls}>
              <div className={styles.selectWrap}>
                <select
                  className={styles.select}
                  value={date.getMonth()}
                  onChange={(e) => changeMonth(Number(e.target.value))}
                  aria-label='Выбрать месяц'
                >
                  {months.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>

              <div className={styles.selectWrap}>
                <select
                  className={styles.select}
                  value={date.getFullYear()}
                  onChange={(e) => changeYear(Number(e.target.value))}
                  aria-label='Выбрать год'
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>
          </div>
        )}
        calendarContainer={({ children }) => (
          <div
            className={styles.calendar}
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Enter') confirm();
              if (e.key === 'Escape') cancel();
            }}
          >
            {children}
            <div className={styles.footer}>
              <button
                type='button'
                className={clsx(styles.btn, styles['ghost-btn'])}
                onClick={cancel}
              >
                Отменить
              </button>
              <button
                type='button'
                className={clsx(styles.btn, styles['primary-btn'])}
                onClick={confirm}
              >
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
const PickerInputAdapter = forwardRef<HTMLInputElement, Partial<InputProps>>(
  ({ value, onClick, placeholder, disabled, className }, ref) => (
    <Input
      ref={ref}
      value={(value as string) ?? ''}
      onClick={onClick}
      placeholder={placeholder}
      readOnly
      disabled={disabled}
      icon={<Icon name='calendar-icon' />}
      iconPosition='right'
      className={className}
    />
  )
);
PickerInputAdapter.displayName = 'PickerInputAdapter';
