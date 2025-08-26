import styles from './ModalOverlay.module.css';
import { ModalOverlayProps } from './types';

export const ModalOverlayUI = ({
  onClose,
  'data-cy': dataCy = 'overlay',
  className,
  overlayStyle,
  children
}: ModalOverlayProps) => (
  <div
    className={`${styles.overlay} ${className ?? ''}`} // добавляем дополнительные классы, если есть
    style={overlayStyle}
    onClick={() => {
      if (onClose) onClose();
    }}
    data-cy={dataCy}
  >
    {children}
  </div>
);
