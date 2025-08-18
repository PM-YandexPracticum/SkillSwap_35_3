// import clsx from 'clsx';
import type { ITitleProps } from './types';
import styles from './title.module.css';

export const Title: React.FC<ITitleProps> = ({
  as: Tag,
  size,
  className,
  children,
  ...rest
}) => {
  const titleClasses = [styles.title, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={titleClasses} {...rest}>
      {children}
    </Tag>
  );
};
