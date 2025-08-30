import { useCallback } from 'react';
import { useAppDispatch, useSelector } from '@/app/store';
import {
  toggleLike as toggleLikeAction,
  setLike as setLikeAction,
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

  return {
    toggleLike,
    setLike,
    likedItems,
    totalLikes
  };
};
