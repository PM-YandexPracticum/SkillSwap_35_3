import React from 'react';
import styles from './ErrorCard.module.css';

import { ErrorCardProps } from './types';

import { Button, Title } from '@/shared/ui';

export const ErrorCard = ({
  title,
  description,
  imageSrc,
  onRetry,
  onGoHome
}: ErrorCardProps) => {
  const isStringImage = typeof imageSrc === 'string';

  return (
    <div className={styles['error-card']}>
      {/* Картинка */}
      <div className={styles['error-card__image']}>
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
      <Title as='h2' size='lg' className={styles['error-card__text-title']}>
        {title}
      </Title>

      {/* Текст */}
      <p className={styles['error-card__text-description']}>{description}</p>

      {/* Блок с кнопками */}
      <div className={styles['error-card__buttons']}>
        {onRetry && (
          <Button
            className={styles['error-card__button']}
            onClick={onRetry}
            type='secondary'
            size='medium'
            width='218px'
          >
            Сообщить об ошибке
          </Button>
        )}
        {onGoHome && (
          <Button
            className={styles['error-card__button']}
            onClick={onGoHome}
            type='primary'
            size='medium'
            width='218px'
          >
            На главную
          </Button>
        )}
      </div>
    </div>
  );
};
