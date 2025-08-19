import React, { useState, useEffect } from 'react';
import { Icon } from '@/shared/ui/Icon'; // Импорт компонента Icon для отображения логотипа
import styles from './Logo.module.css';
import { LogoProps } from './types';

const Logo: React.FC<LogoProps> = ({
  size = 40, // Размер иконки
  fill, // Цвет заливки SVG
  color, // Цвет текста или иконки (может быть передан извне)
  text = 'Skillbox', // Текст рядом с логотипом по умолчанию
  onClick, // Обработчик клика по логотипу
  className = '' // Дополнительные классы для контейнера
}) => {
  // Создаем состояние для хранения цвета из CSS переменной --button-color-accent
  const [accentColor, setAccentColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    // После монтирования компонента получаем стили из корневого элемента документа
    const rootStyles = getComputedStyle(document.documentElement);
    // Получаем значение CSS переменной --button-color-accent
    const buttonColorAccent = rootStyles
      .getPropertyValue('--button-color-accent')
      .trim(); // Удаляем лишние пробелы
    // Устанавливаем полученное значение в состояние accentColor
    setAccentColor(buttonColorAccent);
  }, []); // Эффект срабатывает один раз при монтировании

  // Определяем цвет для иконки:
  // - если передан пропс color — используем его;
  // - иначе — используем значение из CSS переменной (accentColor);
  // - если и его нет — по умолчанию 'currentColor'
  const iconColor = color || accentColor || 'currentColor';

  // Объединяем базовый класс стилей с дополнительным классом из пропса
  const containerClassName = [styles.container, className]
    .filter(Boolean) // Убираем пустые значения
    .join(' '); // Объединяем в строку

  return (
    <div className={containerClassName} onClick={onClick}>
      {/* Передаем цвет в компонент Icon */}
      <Icon
        name='logo-icon' // Имя иконки (предположительно SVG)
        size={size} // Размер иконки
        fill={fill} // Цвет заливки SVG (может быть undefined)
        color={iconColor} // Цвет текста или иконки (вычисленный)
        aria-label='Логотип Skillbox' // Алерт для доступности
      />
      {/* Текст рядом с логотипом */}
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Logo;