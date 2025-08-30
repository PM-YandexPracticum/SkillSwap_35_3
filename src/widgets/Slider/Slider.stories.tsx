import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';
import { Card } from '../Card/Card';
import { Avatar } from '@/shared/ui/Avatar/Avatar';

const meta: Meta<typeof Slider> = {
  title: 'Widgets/Slider',
  component: Slider,
  argTypes: {
    visible: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
      description: 'Number of visible cards at once'
    },
    buttonPosition: {
      control: 'select',
      options: ['edges', 'inside'],
      description: 'Position of navigation buttons'
    }
  },
  parameters: {
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof Slider>;

const users = [
  {
    id: 1,
    name: 'Иван Иванов',
    avatar: '1566492031773-4f4e44671857',
    city: 'Москва'
  },
  {
    id: 2,
    name: 'Петр Петров',
    avatar: '1742201587774-f44fe79556f9',
    city: 'Санкт-Петербург'
  },
  {
    id: 3,
    name: 'Сергей Сергеев',
    avatar: '1754051486494-cfdbf29a589c',
    city: 'Новосибирск'
  },
  {
    id: 4,
    name: 'Мария Иванова',
    avatar: '1568230044329-399ffe29b6d1',
    city: 'Екатеринбург'
  },
  {
    id: 5,
    name: 'Максим',
    avatar: '1749223928612-e7f5e9a2211f',
    city: 'Москва'
  },
  {
    id: 6,
    name: 'Анна Смирнова',
    avatar: '1594026724063-fcf520d86e23',
    city: 'Казань'
  },
  {
    id: 7,
    name: 'Илья Соколов',
    avatar: '1747835369484-97d3f0f782ac',
    city: 'Санкт-Петербург'
  },
  {
    id: 8,
    name: 'Ольга Кузнецова',
    avatar: '1755380549803-c6ab36193884',
    city: 'Нижний Новгород'
  }
];

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

const onDetails = (id: number) => {
  alert(`Подробнее о пользователе с id: ${id}`);
};

const randomSkillId = (max: number) => Math.floor(Math.random() * max) + 1;

function generateRandomBirthdate(startYear = 1980, endYear = 2010) {
  const startDate = new Date(`${startYear}-01-01`);
  const endDate = new Date(`${endYear}-12-31`);

  const randomTimestamp =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());

  const randomDate = new Date(randomTimestamp);
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const day = String(randomDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function createUnsplashUrl(photoId: string) {
  return `https://images.unsplash.com/photo-${photoId}?q=50&w=300&auto=format&fit=crop&ixlib=rb-4.1.0`;
}

const generateCards = (count: number = users.length) => {
  return users.slice(0, count).map((user) => {
    const newUser = {
      id: user.id,
      name: user.name,
      city: user.city,
      teachingSkillId: randomSkillId(5),
      learningSkillIds: [randomSkillId(5)],
      birthDate: generateRandomBirthdate(),
      avatar: createUnsplashUrl(user.avatar),
      about: ''
    };

    return (
      <Card
        key={user.id}
        user={newUser}
        skills={skills}
        onDetails={onDetails}
      />
    );
  });
};

const generateGallery = (count: number = users.length) => {
  return users.slice(0, count).map((user) => {
    return (
      <Avatar
        key={user.id}
        src={createUnsplashUrl(user.avatar)}
        alt={user.name}
      />
    );
  });
};

export const DefaultView: Story = {
  args: {
    visible: 4,
    children: generateCards(6)
  },
  name: 'Стандартный вид (4 из 6)'
};

export const PortraitsView: Story = {
  args: {
    visible: 1,
    children: generateGallery(),
    buttonPosition: 'inside'
  },
  name: 'Галерея навыка (1 из 3, кнопки внутри)'
};

export const FewCardsView: Story = {
  args: {
    visible: 3,
    children: generateCards(2)
  },
  name: 'Недостаточно карточек (3 из 2)'
};

export const ExactCountView: Story = {
  args: {
    visible: 4,
    children: generateCards(4)
  },
  name: 'Ровно 4 карточки (4 из 4)'
};
