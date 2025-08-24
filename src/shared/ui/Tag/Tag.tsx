import React from 'react';
import styles from './Tag.module.css';
import { TagProps } from './types';
import { useCategoryColors } from '@/shared/hooks/useCategoryColors/useCategoryColors';

export const Tag: React.FC<TagProps> = ({
  text,
  category,
  subcategory,
  style
}) => {
  const backgroundColor = useCategoryColors(category, subcategory);

  return (
    <span className={styles.tag} style={{ backgroundColor, ...style }}>
      {text}
    </span>
  );
};
