import { forwardRef, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.css';
import { TextareaProps } from './types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props: TextareaProps, ref) => {
    const {
      className,
      icon,
      iconPosition,
      resize = 'none',
      value,
      onChange,
      ...rest
    } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = (instance: HTMLTextAreaElement | null) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
      textareaRef.current = instance;
    };

    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    useEffect(() => {
      adjustHeight();
    }, [value]);

    const iconContainerClasses = clsx(styles.textarea__icon_container, {
      [styles.textarea__icon_left]: iconPosition === 'left',
      [styles.textarea__icon_right]: iconPosition === 'right'
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={clsx(styles.textarea__wrapper, className)}>
        <textarea
          ref={combinedRef}
          className={clsx(styles.textarea, styles.textarea, {
            [styles[`textarea_resize_${resize}`]]: resize !== 'none'
          })}
          value={value}
          onChange={handleChange}
          rows={4}
          {...rest}
        />
        {icon && <div className={iconContainerClasses}>{icon}</div>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
