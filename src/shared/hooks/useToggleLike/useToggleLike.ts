import { useCallback } from 'react';
import { useAppDispatch, useSelector } from '@/app/store';
import {
  toggleLike,
  selectIsLiked
} from '@/features/favorites/slices/likeSlice';
import { selectIsAuthenticated } from '@/features/auth/selectors/authSelectors';

interface toggleLikeProps {
  itemId: string;
  onToggle?: (isLiked: boolean) => void;
}

export const useToggleLike = ({ itemId, onToggle }: toggleLikeProps) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLiked = useSelector(selectIsLiked(itemId));

  const toggle = useCallback(() => {
    if (!isAuthenticated) {
      alert('Пожалуйста, авторизуйтесь, чтобы добавлять в избранное');
      return;
    }

    const newIsLiked = !isLiked;
    dispatch(toggleLike(itemId));
    onToggle?.(newIsLiked);
  }, [isAuthenticated, isLiked, itemId, dispatch, onToggle]);

  return {
    isLiked,
    toggle
  };
};
