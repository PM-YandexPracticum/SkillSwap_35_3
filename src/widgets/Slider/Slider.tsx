import React, { useState } from 'react';
import styles from './Slider.module.css';
import { ArrorRightIcon } from '@/shared/assets/icons/ui';
import { SliderProps } from './types';

export const Slider: React.FC<SliderProps> = ({
  className,
  ariaLabel,
  visible,
  children,
  buttonPosition = 'edges'
}) => {
  const [startingPoint, setStartingPoint] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const hasHiddenItems = childrenArray.length > visible;
  const visibleChildren = childrenArray.slice(
    startingPoint,
    startingPoint + visible
  );

  const canScrollNext =
    hasHiddenItems && startingPoint + visible < childrenArray.length;
  const canScrollPrev = startingPoint > 0;

  const handleNext = () => {
    if (canScrollNext) {
      setStartingPoint((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canScrollPrev) {
      setStartingPoint((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      aria-label={ariaLabel}
    >
      {hasHiddenItems && canScrollPrev && (
        <button
          className={`${styles.button} ${buttonPosition === 'inside' ? styles['button-prev-inside'] : styles['button-prev']}`}
          onClick={handlePrev}
          aria-label='Previous cards'
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
          aria-label='Next cards'
        >
          <ArrorRightIcon className={styles['chevron-icon']} />
        </button>
      )}
    </div>
  );
};
