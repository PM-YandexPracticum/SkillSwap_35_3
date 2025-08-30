import { useCallback } from 'react';
import { useAppDispatch, useSelector } from '@/app/store';
import {
  toggleLike as toggleLikeAction,
  setLike as setLikeAction,
  selectIsLiked,
  selectLikedItems,
  selectTotalLikes
} from '../slices/likeSlice';

export const useLikes = () => {
  const dispatch = useAppDispatch();

  const likedItems = useSelector(selectLikedItems);
  const totalLikes = useSelector(selectTotalLikes);

  const toggleLike = useCallback(
    (id: string) => {
      dispatch(toggleLikeAction(id));
    },
    [dispatch]
  );

  const setLike = useCallback(
    (id: string, liked: boolean) => {
      dispatch(setLikeAction({ id, liked }));
    },
    [dispatch]
  );

  const isLiked = (id: string) => {
    return useSelector(selectIsLiked(id));
  };

  return {
    toggleLike,
    setLike,
    isLiked,
    likedItems,
    totalLikes
  };
};
