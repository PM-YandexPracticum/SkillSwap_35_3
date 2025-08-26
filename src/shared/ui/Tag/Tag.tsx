import styles from './Tag.module.css';
import { TagProps } from './types';
import { useCategoryColors } from '@/shared/hooks';

export const Tag = ({ text, category, subcategory, style }: TagProps) => {
  const backgroundColor = useCategoryColors(category, subcategory);

  return (
    <span className={styles.tag} style={{ backgroundColor, ...style }}>
      {text}
    </span>
  );
};
