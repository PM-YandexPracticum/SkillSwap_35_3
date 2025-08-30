import { useState } from 'react';
import { Slider } from '@/widgets';
import { GalleryProps } from './types';
import styles from './Gallery.module.css';

export const Gallery = ({ images, title, className }: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const MAX_THUMBNAILS = 3;
  const visibleThumbnails = images.slice(0, MAX_THUMBNAILS);
  const remainingImagesCount = images.length - MAX_THUMBNAILS;

  const reorderedImages = [
    ...images.slice(activeIndex),
    ...images.slice(0, activeIndex)
  ];

  const sliderItems = reorderedImages.map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`${title || 'Картинка навыка'} ${index + 1}`}
    />
  ));

  return (
    <div className={`${styles.gallery} ${className || ''}`}>
      <div className={styles['gallery__slider-wrapper']}>
        <Slider
          visible={1}
          buttonPosition='inside'
          ariaLabel={`Галерея изображений для навыка "${title}"`}
        >
          {sliderItems}
        </Slider>
      </div>

      <div className={styles['gallery__thumbnails']}>
        {visibleThumbnails.map((imgSrc, index) => {
          const isLastThumbnailSlot = index === MAX_THUMBNAILS - 1;
          const hasMoreImages = remainingImagesCount > 0;

          if (isLastThumbnailSlot && hasMoreImages) {
            return (
              <div
                key='counter'
                className={styles['gallery__thumbnail-counter']}
                onClick={() => setActiveIndex(index)}
              >
                <img src={imgSrc} alt={`Картинка навыка ${index + 1}`} />
                <div className={styles['gallery__counter-overlay']}>
                  +{remainingImagesCount}
                </div>
              </div>
            );
          }

          return (
            <img
              key={imgSrc}
              src={imgSrc}
              alt={`Картинка навыка ${index + 1}`}
              className={`${styles['gallery__thumbnail']} ${activeIndex === index ? styles['gallery__thumbnail--active'] : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
};
