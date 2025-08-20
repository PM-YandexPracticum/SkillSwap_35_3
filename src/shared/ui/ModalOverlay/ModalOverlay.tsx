import React from 'react';
import styles from './ModalOverlay.module.css';
import { ModalOverlayProps } from './types';

export const ModalOverlayUI: React.FC<ModalOverlayProps> = ({
  onClose,
  'data-cy': dataCy = 'overlay',
}) => <div className={styles.overlay} onClick={onClose} data-cy={dataCy} />;
