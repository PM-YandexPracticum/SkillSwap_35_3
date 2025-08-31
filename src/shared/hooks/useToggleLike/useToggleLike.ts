import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useSelector } from '@/app/store';
import {
  toggleLike,
  selectIsLiked
} from '@/features/favorites/slices/likeSlice';
import { selectIsAuthenticated } from '@/features/auth/selectors/authSelectors';
import { pathConstants } from '@/shared/lib/constants/paths';

interface toggleLikeProps {
  itemId: string;
  onToggle?: (isLiked: boolean) => void;
}

export const useToggleLike = ({ itemId, onToggle }: toggleLikeProps) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const isLiked = useSelector(selectIsLiked(itemId));

  const toggle = useCallback(() => {
    if (!isAuthenticated) {
      navigate(pathConstants.LOGIN, { state: { background: location } });
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
