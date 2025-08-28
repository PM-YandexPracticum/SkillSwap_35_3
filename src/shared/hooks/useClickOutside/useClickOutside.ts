import { RefObject, useEffect } from 'react';

type PossibleRef<T extends HTMLElement> = RefObject<T | null>;

interface UseClickOutsideOptions {
  onClickOutside: (event: MouseEvent) => void;
  enabled?: boolean;
}

export const useClickOutside = <T extends HTMLElement>(
  refs: PossibleRef<T>[],
  { onClickOutside, enabled = true }: UseClickOutsideOptions
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      const isOutside = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target as Node);
      });

      if (isOutside) {
        onClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [refs, onClickOutside, enabled]);
};
