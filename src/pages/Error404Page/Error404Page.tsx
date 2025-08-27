import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorCard } from '@/shared/ui';
import { errors } from '@/shared/lib/constants/errors';
import styles from './Error404Page.module.css';

export const Error404Page = () => {
  const navigate = useNavigate();
  const data = errors[404];

  return (
    <main className={styles.main}>
      <ErrorCard
        title={data.title}
        description={data.description}
        imageSrc={data.image}
        onGoHome={() => navigate('/')}
        onRetry={() => window.location.reload()}
      />
    </main>
  );
};
