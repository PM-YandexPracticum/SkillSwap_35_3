import { useState, useRef, useEffect } from 'react';
import { CityFilterProps } from './type';
import { Checkbox, Icon } from '@/shared/ui';
import styles from './CityFilter.module.css';

const cities = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск'
];

export const CityFilter = ({ onChange, value }: CityFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('208px');

  const handleToggleAll = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setMaxHeight(`${height}px`);
    } else {
      setMaxHeight('208px');
    }
  }, [isOpen]);

  const handleToggle = (city: string) => {
    const isSelected = value.includes(city);
    const updated = isSelected
      ? value.filter((c) => c !== city)
      : [...value, city];
    onChange(updated);
  };

  return (
    <fieldset className={styles.filter__city}>
      <div className={styles['filter__city-wrapper']}>
        <legend className={styles['filter__city-title']}>Город</legend>

        <div
          className={styles['filter__city-checkbox-container']}
          style={{ maxHeight }}
        >
          <div
            ref={containerRef}
            className={styles['filter__city-checkbox-list']}
          >
            {cities.map((city) => (
              <Checkbox
                onChange={() => handleToggle(city)}
                name={city}
                key={city}
                className={styles['filter__city-checkbox-item']}
                values={value}
                options={[
                  {
                    value: city,
                    label: (
                      <span
                        className={styles['filter__city-checkbox-item-title']}
                      >
                        {city}
                      </span>
                    )
                  }
                ]}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleToggleAll}
        className={styles['filter__city-checbox-button']}
        aria-expanded={isOpen}
      >
        {isOpen ? 'Скрыть' : 'Все города'}
        {isOpen ? (
          <Icon name='arrow-up-icon' />
        ) : (
          <Icon name='arrow-down-icon' />
        )}
      </button>
    </fieldset>
  );
};
