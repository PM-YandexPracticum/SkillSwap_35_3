export const DEFAULT_COLOR = 'var(--tag-color-plus)';

type Category = {
  name: string;
  color: string;
  subs: string[];
};

export const categories: Category[] = [
  {
    name: 'Бизнес и карьера',
    color: 'var(--tag-color-business)',
    subs: [
      'Управление командой',
      'Маркетинг и реклама',
      'Продажи и переговоры',
      'Личный бренд',
      'Резюме и собеседование',
      'Тайм-менеджмент',
      'Проектное управление',
      'Предпринимательство'
    ]
  },
  {
    name: 'Иностранные языки',
    color: 'var(--tag-color-language)',
    subs: [
      'Английский',
      'Немецкий',
      'Испанский',
      'Французский',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)'
    ]
  },
  {
    name: 'Творчество и искусство',
    color: 'var(--tag-color-art)',
    subs: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY'
    ]
  },
  {
    name: 'Образование и развитие',
    color: 'var(--tag-color-education)',
    subs: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг'
    ]
  },
  {
    name: 'Дом и уют',
    color: 'var(--tag-color-household)',
    subs: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей'
    ]
  },
  {
    name: 'Здоровье и лайфстайл',
    color: 'var(--tag-color-lifestyle)',
    subs: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы'
    ]
  }
];

export const CATEGORY_COLORS = Object.fromEntries(
  categories.map((c) => [c.name, c.color] as const)
) as Record<string, string>;

export const SUBCATEGORY_COLORS = Object.fromEntries(
  categories.flatMap((c) => c.subs.map((s) => [s, c.name] as const))
) as Record<string, keyof typeof CATEGORY_COLORS>;

export const isCategoryKey = (
  key: string
): key is keyof typeof CATEGORY_COLORS =>
  Object.prototype.hasOwnProperty.call(CATEGORY_COLORS, key);

export const getCategoryColor = (category?: string | null): string =>
  category && isCategoryKey(category)
    ? CATEGORY_COLORS[category]
    : DEFAULT_COLOR;

export const getSubcategoryColor = (subcategory?: string | null): string => {
  if (!subcategory) return DEFAULT_COLOR;
  const mapped = SUBCATEGORY_COLORS[subcategory];
  return mapped && isCategoryKey(mapped)
    ? CATEGORY_COLORS[mapped]
    : DEFAULT_COLOR;
};

export {
  CATEGORY_COLORS as categoryColors,
  SUBCATEGORY_COLORS as subcategoryColors
};
