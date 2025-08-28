import React from 'react';

export interface HeaderProps {
  className?: string; // Дополнительные классы для стилизации
  children?: React.ReactNode; // Вложенные элементы
  isSticky?: boolean; // Хедер "прилипает" к верху страницы
  ariaLabel?: string; // ARIA-метка для доступности
  'data-cy'?: string; // дата-атрибут для тестирования
}
