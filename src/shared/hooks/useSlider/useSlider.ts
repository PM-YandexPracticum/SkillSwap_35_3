import React, { useState, useMemo } from 'react';

interface UseSliderProps {
  visible: number;
  children: React.ReactNode;
}

interface UseSliderReturn {
  startingPoint: number;
  childrenArray: React.ReactNode[];
  hasHiddenItems: boolean;
  visibleChildren: React.ReactNode[];
  canScrollNext: boolean;
  canScrollPrev: boolean;
  handleNext: () => void;
  handlePrev: () => void;
}

export const useSlider = ({
  visible,
  children
}: UseSliderProps): UseSliderReturn => {
  const [startingPoint, setStartingPoint] = useState(0);

  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  const hasHiddenItems = childrenArray.length > visible;

  const visibleChildren = useMemo(
    () => childrenArray.slice(startingPoint, startingPoint + visible),
    [childrenArray, startingPoint, visible]
  );

  const canScrollNext = useMemo(
    () => hasHiddenItems && startingPoint + visible < childrenArray.length,
    [hasHiddenItems, startingPoint, visible, childrenArray.length]
  );

  const canScrollPrev = useMemo(() => startingPoint > 0, [startingPoint]);

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

  return {
    startingPoint,
    childrenArray,
    hasHiddenItems,
    visibleChildren,
    canScrollNext,
    canScrollPrev,
    handleNext,
    handlePrev
  };
};
