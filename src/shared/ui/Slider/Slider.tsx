import React from 'react';
import styles from './Slider.module.css';
import { ArrorRightIcon } from '@/shared/assets/icons/ui';
import { SliderProps } from './types';
import { useSlider } from '@/shared/hooks';

export const Slider = ({
  className,
  ariaLabel,
  ariaLabelNext = 'Следующие слайды',
  ariaLabelPrev = 'Предыдущие слайды',
  visible,
  children,
  buttonPosition = 'edges'
}: SliderProps) => {
  const {
    hasHiddenItems,
    visibleChildren,
    canScrollNext,
    canScrollPrev,
    handleNext,
    handlePrev
  } = useSlider({ visible, children });

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      aria-label={ariaLabel}
    >
      {hasHiddenItems && canScrollPrev && (
        <button
          className={`${styles.button} ${buttonPosition === 'inside' ? styles['button-prev-inside'] : styles['button-prev']}`}
          onClick={handlePrev}
          aria-label={ariaLabelPrev}
        >
          <ArrorRightIcon className={styles['chevron-icon']} />
        </button>
      )}

      <div className={styles.slider}>
        <div className={styles.items}>{visibleChildren}</div>
      </div>

      {hasHiddenItems && canScrollNext && (
        <button
          className={`${styles.button} ${buttonPosition === 'inside' ? styles['button-next-inside'] : styles['button-next']}`}
          onClick={handleNext}
          aria-label={ariaLabelNext}
        >
          <ArrorRightIcon className={styles['chevron-icon']} />
        </button>
      )}
    </div>
  );
};
