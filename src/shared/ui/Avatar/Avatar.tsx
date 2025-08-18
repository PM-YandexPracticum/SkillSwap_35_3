import React from 'react';
import styles from './Avatar.module.css';
import { AvatarProps } from './types';

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  className = '',
  onClick
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.avatar} ${className}`}
      onClick={onClick}
    />
  );
};

export default Avatar;
