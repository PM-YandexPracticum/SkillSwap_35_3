import React from 'react';
import styles from './ActionBar.module.css';
import { ActionBarProps } from './types';
import { Button } from '../Button';

export const ActionBar: React.FC<ActionBarProps> = ({
  onLike,
  onShare,
  onMore,
  liked = false
}) => {
  return (
    <div className={styles.actionBar}>
      <Button
        iconName={`${liked ? 'like-icon-fill' : 'like-icon'}`}
        size='small'
        type='ghost'
        onClick={onLike}
        className={`${styles.actionButton} ${liked ? styles.liked : ''}`}
        aria-label='Like'
      />

      <Button
        iconName='share-icon'
        size='small'
        type='ghost'
        onClick={onShare}
        className={styles.actionButton}
        aria-label='Share'
      />

      <Button
        iconName='more-square-icon'
        size='small'
        type='ghost'
        onClick={onMore}
        className={styles.actionButton}
        aria-label='More'
      />
    </div>
  );
};
