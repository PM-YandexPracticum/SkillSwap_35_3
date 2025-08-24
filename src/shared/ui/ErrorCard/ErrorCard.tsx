// src/components/ErrorCard.tsx
import React from 'react';
import styles from './ErrorCard.module.css';

import { ErrorCardProps } from './types';

import error404 from '@/shared/assets/images/error404.png'; // Импорт картинки
import { Button } from '@/shared/ui/Button'; // Импорт компонента Button
import { Title } from '@/shared/ui/Title';

export const ErrorCard: React.FC<ErrorCardProps> = ({
  title = 'Страница не найдена',
  message = 'К сожалению, эта страница недоступна. Вернитесь <br /> на главную страницу или попробуйте позже',
  onRetry,
  onGoHome
}) => {
  return (
    <div className={styles['error-card']}>
      {/* Картинка Error404 */}
      <div className={styles['error-image']}>
        <img src={error404} alt='Error 404' />
      </div>

      {/* Заголовок и текст */}
      <div className={styles['error-card__text']}>
        <Title as='h2' size='lg' className={styles['error-card__text-title']}>
          {title}
        </Title>
        {/* Используем dangerouslySetInnerHTML для вставки HTML */}
        <p
          className={styles['error-card__text-description']}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>

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
