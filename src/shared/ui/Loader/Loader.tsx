import React from 'react';
import styles from './loader.module.css';

export const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.loader_circle} />
  </div>
);
