import { RadioUI } from '@/shared/ui';
import { RadioFilterProps } from './type';
import styles from './RadioFilter.module.css';

export const RadioFilter = ({
  value,
  onChange,
  radioList,
  title,
  name
}: RadioFilterProps) => {
  return (
    <fieldset className={styles.radio__filter}>
      <div className={styles['radio__filter-wrapper']}>
        {title ? (
          <legend className={styles['radio__filter-title']}>{title}</legend>
        ) : null}

        <div className={styles['radio__filter-container']}>
          {radioList.map((item) => (
            <RadioUI
              key={item}
              name={name}
              value={value}
              options={[
                {
                  value: item,
                  label: (
                    <span className={styles['radio__filter-item-title']}>
                      {item}
                    </span>
                  )
                }
              ]}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
};
