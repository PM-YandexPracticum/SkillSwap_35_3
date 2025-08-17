import React from 'react';
import styles from './CardAvatar.module.css';
import { CardAvatarProps } from './types';

const CardAvatar: React.FC<CardAvatarProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles['card-avatar']} />;
};

export default CardAvatar;
