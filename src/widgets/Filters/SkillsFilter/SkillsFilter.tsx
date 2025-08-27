import { useState, useRef, useEffect } from 'react';
import { Checkbox, Icon } from '@/shared/ui';
import styles from './SkillsFilter.module.css';
import { SkillCategory, SkillsFilterProps } from './type';

export const SkillsFilter = ({
  onChange,
  value,
  skills
}: SkillsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleToggleAll = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    Object.keys(openCategories).forEach((categoryValue) => {
      if (
        openCategories[categoryValue] &&
        categoryRefs.current[categoryValue]
      ) {
        // Принудительно обновите высоту после рендера
        requestAnimationFrame(() => {
          const element = categoryRefs.current[categoryValue];
          if (element) {
            element.style.maxHeight = `${element.scrollHeight}px`;
          }
        });
      }
    });
  }, [openCategories]);

  const handleToggleCategory = (categoryValue: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryValue]: !prev[categoryValue]
    }));
  };

  const handleSkillToggle = (skillId: string, nextChecked: boolean) => {
    const updated = nextChecked
      ? [...value, skillId]
      : value.filter((v) => v !== skillId);
    onChange(updated);
  };

  const handleCategoryToggle = (
    category: SkillCategory,
    nextChecked: boolean
  ) => {
    const allSkillIds = getAllCategorySkillIds(category);

    let updated: string[];
    if (nextChecked) {
      updated = [...value, ...allSkillIds.filter((id) => !value.includes(id))];
    } else {
      updated = value.filter((v) => !allSkillIds.includes(v));
    }

    onChange(updated);
  };

  const getAllCategorySkillIds = (category: SkillCategory): string[] => {
    const allSkillIds = [category.value];
    if (category.subcategories) {
      category.subcategories.forEach((sub) => allSkillIds.push(sub.value));
    }
    return allSkillIds;
  };

  const isCategorySelected = (category: SkillCategory) => {
    const allSkillIds = getAllCategorySkillIds(category);
    return allSkillIds.every((id) => value.includes(id));
  };

  const isCategoryPartial = (category: SkillCategory) => {
    const allSkillIds = getAllCategorySkillIds(category);
    return (
      allSkillIds.some((id) => value.includes(id)) &&
      !allSkillIds.every((id) => value.includes(id))
    );
  };

  const setCategoryRef =
    (categoryValue: string) => (el: HTMLDivElement | null) => {
      categoryRefs.current[categoryValue] = el;
    };

  return (
    <fieldset className={styles.filter__skills}>
      <div className={styles['filter__skills-wrapper']}>
        <legend className={styles['filter__skills-title']}>Навыки</legend>
        <div className={styles['filter__skills-checbox-list-wrapper']}>
          {skills.map((category) => {
            const isSelected = isCategorySelected(category);
            const isPartial = isCategoryPartial(category);
            const hasSubcategories =
              category.subcategories && category.subcategories.length > 0;
            const isCategoryOpen = openCategories[category.value];

            return (
              <div
                key={category.value}
                className={
                  hasSubcategories
                    ? styles['filter__skills-category--with-subcategories']
                    : ''
                }
              >
                <div className={styles['filter__skills-category-header']}>
                  <Checkbox
                    name={category.value}
                    values={isSelected || isPartial ? [category.value] : []}
                    onChange={(val, checked) =>
                      handleCategoryToggle(category, checked)
                    }
                    variant={isPartial ? 'dash' : 'check'}
                    options={[
                      {
                        value: category.value,
                        label: (
                          <span
                            className={styles['filter__skills-category-title']}
                          >
                            {category.name}
                          </span>
                        )
                      }
                    ]}
                  />

                  {hasSubcategories && (
                    <button
                      onClick={() => handleToggleCategory(category.value)}
                      className={styles['filter__skills-category-toggle']}
                      type='button'
                    >
                      <Icon
                        name={
                          isCategoryOpen ? 'arrow-up-icon' : 'arrow-down-icon'
                        }
                      />
                    </button>
                  )}
                </div>

                {hasSubcategories && (
                  <div
                    ref={setCategoryRef(category.value)}
                    className={styles['filter__skills-subcategories-container']}
                    style={{
                      maxHeight: isCategoryOpen
                        ? `${categoryRefs.current[category.value]?.scrollHeight}px`
                        : '0px'
                    }}
                  >
                    <div className={styles['filter__skills-subcategories']}>
                      {category.subcategories!.map((subcategory) => (
                        <Checkbox
                          className={
                            styles['filter__skills-subcategories-item']
                          }
                          name={subcategory.value}
                          key={subcategory.value}
                          values={
                            value.includes(subcategory.value)
                              ? [subcategory.value]
                              : []
                          }
                          onChange={(val, checked) =>
                            handleSkillToggle(subcategory.value, checked)
                          }
                          options={[
                            {
                              value: subcategory.value,
                              label: (
                                <span
                                  className={
                                    styles['filter__skills-subcategory-title']
                                  }
                                >
                                  {subcategory.name}
                                </span>
                              )
                            }
                          ]}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleToggleAll}
        aria-expanded={isOpen}
        type='button'
        className={styles['filter__skills-button']}
      >
        {isOpen ? 'Скрыть' : 'Все категории'}
        {isOpen ? (
          <Icon name='arrow-up-icon' />
        ) : (
          <Icon name='arrow-down-icon' />
        )}
      </button>
    </fieldset>
  );
};
