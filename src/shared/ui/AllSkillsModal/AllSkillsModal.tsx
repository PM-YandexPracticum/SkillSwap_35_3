import React from 'react';
import { Icon } from '@/shared/ui';
import styles from './AllSkillsModal.module.css';
import { categories } from '@/shared/lib/constants/categoryColors';
import { AllSkillsModalProps, CategoryColorName } from './types';

export const AllSkillsModal: React.FC<AllSkillsModalProps> = ({ isOpen }) => {
  const getCleanColorName = (colorVar: string): CategoryColorName => {
    const match = colorVar.match(/var\(--tag-color-(.*?)\)/);
    const name = match ? match[1] : 'business';
    return name as CategoryColorName;
  };

  if (!isOpen) return null;

  return (
    <div className={styles['skills__modal-container']}>
      <div className={styles['skills__modal']}>
        {categories.map((category) => {
          const cleanColorName = getCleanColorName(category.color);
          return (
            <div
              key={category.name}
              className={styles['skills__modal-item']}
              style={{ borderLeftColor: category.color }}
            >
              <div
                className={styles['icon-circle']}
                style={{ backgroundColor: category.color }}
              >
                <Icon
                  name={`category-${cleanColorName}-icon`}
                  className={styles['item-icon']}
                />
              </div>
              <div className={styles['skills__modal-item-text']}>
                <h2 className={styles['item-title']}>{category.name}</h2>
                <div className={styles['item-subs']}>
                  {category.subs.map((sub) => (
                    <p key={sub} className={styles['sub-item']}>
                      {sub}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllSkillsModal;
