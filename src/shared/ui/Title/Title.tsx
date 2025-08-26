import type { ITitleProps } from './types';
import styles from './title.module.css';

export function Title({
  as: Tag,
  size,
  className,
  children,
  ...rest
}: ITitleProps) {
  const titleClasses = [styles.title, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={titleClasses} {...rest}>
      {children}
    </Tag>
  );
}
