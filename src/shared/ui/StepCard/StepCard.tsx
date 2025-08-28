import React from 'react';
import styles from './StepCard.module.css';

import { StepCardProps } from './types';

import { Title } from '@/shared/ui/Title';

export const StepCard = ({ title, description, imageSrc }: StepCardProps) => {
  const isStringImage = typeof imageSrc === 'string';

  return (
    <div className={styles['step-card']}>
      {/* Картинка */}
      <div className={styles['step-card__image']}>
        {isStringImage ? (
          <img src={imageSrc} alt={``} />
        ) : (
          React.createElement(
            imageSrc as React.FC<React.SVGProps<SVGSVGElement>>,
            {
              width: 300, // по макету
              height: 300, // по макету
              role: 'img',
              'aria-label': ``
            }
          )
        )}
      </div>

      {/* Контент */}
      <div className={styles['step-card__content']}>
        <Title as='h2' size='lg' className={styles['step-card__text-title']}>
          {title}
        </Title>

        {/* Текст */}
        <p className={styles['step-card__text-description']}>{description}</p>
      </div>
    </div>
  );
};
