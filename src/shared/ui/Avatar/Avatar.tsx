import styles from './Avatar.module.css';
import { AvatarProps } from './types';

export const Avatar = ({ src, alt, className = '', onClick }: AvatarProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.avatar} ${className ? className : ''}`}
      onClick={onClick}
    />
  );
};
