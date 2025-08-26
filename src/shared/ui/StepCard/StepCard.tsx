import React from 'react';
import styles from './StepCard.module.css';

import { StepCardProps } from './types';

import { Title } from '@/shared/ui/Title';

export const ErrorCard: React.FC<StepCardProps> = ({
  title,
  description,
  imageSrc
}) => {
  const isStringImage = typeof imageSrc === 'string';

  return (
    <div className={styles['step-card']}>
      {/* Картинка */}
      <div className={styles['step-card__image']}>
        {isStringImage ? (
          <img src={imageSrc} alt={`Ошибка: ${title}`} />
        ) : (
          React.createElement(
            imageSrc as React.FC<React.SVGProps<SVGSVGElement>>,
            {
              width: 460, // по макету
              height: 304, // по макету
              role: 'img',
              'aria-label': `Ошибка: ${title}`
            }
          )
        )}
      </div>

      {/* Заголовок */}
      <Title as='h2' size='lg' className={styles['step-card__text-title']}>
        {title}
      </Title>

      {/* Текст */}
      <p className={styles['step-card__text-description']}>{description}</p>
    </div>
  );
};
