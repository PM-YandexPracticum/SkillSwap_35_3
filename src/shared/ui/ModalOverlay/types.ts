import React from 'react';

export interface ModalOverlayProps {
  onClose?: () => void; // функция закрытия модалки
  className?: string; // дополнительные классы для стилизации
  overlayStyle?: React.CSSProperties; // inline-стили для оверлея
  'data-cy'?: string; // дата-атрибут для тестирования
}
