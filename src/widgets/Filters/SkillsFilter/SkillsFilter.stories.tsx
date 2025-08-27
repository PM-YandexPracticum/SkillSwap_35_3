import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SkillsFilter } from './SkillsFilter';
import { SkillCategory, SkillsFilterProps } from './type';

type StoryArgs = SkillsFilterProps;

const skillsData: SkillCategory[] = [
  {
    value: 'business',
    name: 'Бизнес и карьера',
    subcategories: [
      { value: 'management', name: 'Управление и менеджмент' },
      { value: 'marketing', name: 'Маркетинг и продажи' },
      { value: 'finance', name: 'Финансы и инвестиции' },
      { value: 'startups', name: 'Стартапы и предпринимательство' },
      { value: 'career', name: 'Карьерный рост' },
      { value: 'negotiations', name: 'Переговоры и коммуникации' },
      { value: 'personal-brand', name: 'Личный бренд' },
      { value: 'business-analytics', name: 'Бизнес-аналитика' }
    ]
  },
  {
    value: 'creativity',
    name: 'Творчество и искусство',
    subcategories: [
      { value: 'drawing', name: 'Рисование и иллюстрация' },
      { value: 'photography', name: 'Фотография' },
      { value: 'video', name: 'Видеомонтаж' },
      { value: 'music', name: 'Музыка и звук' },
      { value: 'acting', name: 'Актёрское мастерство' },
      { value: 'writing', name: 'Креативное письмо' },
      { value: 'art-therapy', name: 'Арт-терапия' },
      { value: 'decor', name: 'Декор и DIY' }
    ]
  },
  {
    value: 'languages',
    name: 'Иностранные языки',
    subcategories: [
      { value: 'english', name: 'Английский язык' },
      { value: 'german', name: 'Немецкий язык' },
      { value: 'french', name: 'Французский язык' },
      { value: 'spanish', name: 'Испанский язык' },
      { value: 'chinese', name: 'Китайский язык' },
      { value: 'japanese', name: 'Японский язык' },
      { value: 'italian', name: 'Итальянский язык' },
      { value: 'other-languages', name: 'Другие языки' }
    ]
  },
  {
    value: 'education',
    name: 'Образование и развитие',
    subcategories: [
      { value: 'preschool', name: 'Дошкольное образование' },
      { value: 'school', name: 'Школьные предметы' },
      { value: 'university', name: 'Вузовская программа' },
      { value: 'professional-development', name: 'Профессиональное развитие' },
      { value: 'personal-growth', name: 'Личностный рост' },
      { value: 'memory', name: 'Развитие памяти' },
      { value: 'critical-thinking', name: 'Критическое мышление' },
      { value: 'speed-reading', name: 'Скорочтение' }
    ]
  },
  {
    value: 'health',
    name: 'Здоровье и лайфстайл',
    subcategories: [
      { value: 'fitness', name: 'Фитнес и тренировки' },
      { value: 'yoga', name: 'Йога и медитация' },
      { value: 'nutrition', name: 'Питание и диетология' },
      { value: 'mental-health', name: 'Психическое здоровье' },
      { value: 'beauty', name: 'Красота и уход' },
      { value: 'sports', name: 'Спорт' },
      { value: 'rehabilitation', name: 'Реабилитация' },
      { value: 'healthy-habits', name: 'Здоровые привычки' }
    ]
  },
  {
    value: 'home',
    name: 'Дом и уют',
    subcategories: [
      { value: 'interior-design', name: 'Интерьер и дизайн' },
      { value: 'gardening', name: 'Садоводство и растения' },
      { value: 'cooking', name: 'Кулинария' },
      { value: 'handmade', name: 'Рукоделие' },
      { value: 'cleaning', name: 'Уборка и организация' },
      { value: 'repair', name: 'Ремонт' },
      { value: 'feng-shui', name: 'Фэн-шуй' },
      { value: 'hosting', name: 'Приём гостей' }
    ]
  }
];

export default {
  title: 'UI/SkillsFilter',
  component: SkillsFilter,
  argTypes: {
    onChange: { action: 'changed' }
  }
} as Meta<StoryArgs>;

export const Filter: StoryObj<StoryArgs> = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <SkillsFilter value={value} onChange={setValue} skills={skillsData} />
    );
  }
};
