import React from 'react';

export interface FooterProps {
  show?: boolean; // Управляет отображением футера (по умолчанию true)
  className?: string; // Дополнительные классы для стилизации
  style?: React.CSSProperties; // Встроенные стили
  children?: React.ReactNode; // Вложенные элементы внутри футера
  isSticky?: boolean; // Футер "прилипает" к низу страницы
  backgroundColor?: string; // Цвет фона футера
  height?: string | number; // Высота футера
  padding?: string; // Отступы внутри футера
  onClick?: () => void; // Обработчик клика по футеру
  id?: string; // Идентификатор элемента
  ariaLabel?: string; // ARIA-метка для доступности
  'data-cy'?: string; // дата-атрибут для тестирования
}
