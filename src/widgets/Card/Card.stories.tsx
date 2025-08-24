import React from 'react';
import { Card } from './Card';
import { CardProps } from './types';

export default {
  title: 'Widgets/Card',
  component: Card
};

const skills = [
  {
    id: 1,
    title: 'Техника Pomodoro',
    category: 'Бизнес и карьера',
    subcategory: 'Тайм-менеджмент'
  },
  {
    id: 2,
    title: 'Работа с возражениями',
    category: 'Бизнес и карьера',
    subcategory: 'Продажи и переговоры'
  },
  {
    id: 3,
    title: 'Разговорный английский',
    category: 'Иностранные языки',
    subcategory: 'Английский'
  },
  {
    id: 4,
    title: 'Цифровой рисунок в Procreate',
    category: 'Творчество и искусство',
    subcategory: 'Рисование и иллюстрация'
  },
  {
    id: 5,
    title: 'Цифровой рисунок в Procreate',
    category: 'Творчество и искусство',
    subcategory: 'Рисование и иллюстрация'
  }
];

const user: CardProps['user'] = {
  id: 5,
  name: 'Максим',
  avatar:
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0',
  city: 'Москва',
  birthDate: '2002-02-14',
  teachingSkillId: 1,
  learningSkillIds: [2, 3, 4, 5]
};

const onDetails = (id: number) => {
  alert(`Подробнее о пользователе с id: ${id}`);
};

export const Default = () => (
  <Card user={user} skills={skills} onDetails={onDetails} />
);

export const NoTeachSkill = () => (
  <Card
    user={{ ...user, teachingSkillId: 999 }}
    skills={skills}
    onDetails={onDetails}
  />
);

export const OneLearnSkill = () => (
  <Card
    user={{ ...user, learningSkillIds: [2] }}
    skills={skills}
    onDetails={onDetails}
  />
);

export const NoLearnSkills = () => (
  <Card
    user={{ ...user, learningSkillIds: [] }}
    skills={skills}
    onDetails={onDetails}
  />
);

// КОММЕНТАРИИ:
// - Проверяются все состояния: навык обучения есть/нет, навыки изучения 1, много, нет.
// - Используй настоящие данные и URL для аватара.
// - onDetails — простая функция для теста.
