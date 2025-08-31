import { MemoryRouter } from 'react-router-dom';
import { CardsFeed } from './CardsFeed';
import mockData from '@/api/mockData.json';
import { IUser } from '@/api/types';

const usersTyped = mockData.users.map((user) => ({
  ...user,
  gender: user.gender === 'male' ? 'male' : 'female'
})) as IUser[];

export default {
  title: 'widgets/CardsFeed',
  component: CardsFeed
};

export const Default = () => (
  <MemoryRouter>
    <CardsFeed usersData={usersTyped} skillsData={mockData.skills} />
  </MemoryRouter>
);
