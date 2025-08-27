import { Icon } from '@/shared/ui';
import styles from './AllSkillsModal.module.css';
import { categories } from '@/shared/lib/constants/categoryColors';
import { AllSkillsModalProps, CategoryColorName } from './types';
import { createPortal } from 'react-dom';

export const AllSkillsModal = ({ isOpen }: AllSkillsModalProps) => {
  const getCleanColorName = (colorVar: string): CategoryColorName => {
    const match = colorVar.match(/var\(--tag-color-(.*?)\)/);
    const name = match ? match[1] : 'business';
    return name as CategoryColorName;
  };

  if (!isOpen) return null;

  return createPortal(
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
    </div>,
    document.body
  );
};

export default AllSkillsModal;
