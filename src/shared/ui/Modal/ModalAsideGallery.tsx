import React from 'react';
import styles from './modal.module.css';
import { AsideGalleryProps } from './types';

export const AsideGallery: React.FC<AsideGalleryProps> = ({
  images = [],
  alt
}) => {
  const [cover, ...rest] = images;
  const thumbs = rest.slice(0, 3);
  const extraCount = Math.max(rest.length - 3, 0);

  return (
    <div className={styles.asideGrid}>
      {cover && <img src={cover} alt={alt} className={styles.asideCover} />}
      <div className={styles.asideThumbs}>
        {thumbs.map((src, i) => {
          const isLast = i === thumbs.length - 1 && extraCount > 0;
          return (
            <div key={i} className={styles.thumbWrap}>
              <img src={src} alt='' className={styles.asideThumb} />
              {isLast && (
                <div className={styles.thumbOverlay}>+{extraCount}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
