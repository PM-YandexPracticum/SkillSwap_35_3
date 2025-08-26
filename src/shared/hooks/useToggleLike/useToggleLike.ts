import { useState, useCallback } from 'react';

interface toggleLikeProps {
  defaultLiked?: boolean;
  onToggle?: (isLiked: boolean) => void;
}

export const useToggleLike = ({
  defaultLiked = false,
  onToggle
}: toggleLikeProps = {}) => {
  const [isLiked, setIsLiked] = useState(defaultLiked);

  const toggle = useCallback(() => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    onToggle?.(newIsLiked); // Здесь можно описать логику (отправку на сервер)
  }, [isLiked, onToggle]);

  return {
    isLiked,
    toggle
  };
};
