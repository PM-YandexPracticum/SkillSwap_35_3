import styles from './modal.module.css';
import { AsideGalleryProps } from './types';

export function AsideGallery({ images = [], alt }: AsideGalleryProps) {
  const [cover, ...rest] = images;
  const thumbs = rest.slice(0, 3);
  const extraCount = Math.max(rest.length - 3, 0);

  return (
    <div className={styles['aside-gallery']}>
      {cover && (
        <img src={cover} alt={alt} className={styles['aside-gallery__cover']} />
      )}
      <div className={styles['aside-gallery__thumbs']}>
        {thumbs.map((src, i) => {
          const isLast = i === thumbs.length - 1 && extraCount > 0;
          return (
            <div key={i} className={styles['aside-gallery__thumb-wrapper']}>
              <img
                src={src}
                alt=''
                className={styles['aside-gallery__thumb']}
              />
              {isLast && (
                <div className={styles['aside-gallery__overlay']}>
                  +{extraCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
