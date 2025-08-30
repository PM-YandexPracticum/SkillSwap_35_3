import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import filtersReducer, {
  type FiltersState
} from '@/entities/Filters/model/filtersSlice';
import { selectFilters } from '@/entities/Filters/model/filtersSelectors';
import applyFilters from '@/entities/Filters/lib/applyFilters';

import mock from '@/api/mockData.json';
import { FiltersPanel } from './FiltersPanel';
import { CardsFeed } from '@/widgets/CardsFeed';
import { useSelector } from '@/app/store';

type IUser = (typeof mock)['users'][number];
type ISkill = (typeof mock)['skills'][number];

const makeStore = (preloaded?: Partial<FiltersState>) =>
  configureStore({
    reducer: combineReducers({ filters: filtersReducer }),
    preloadedState: preloaded
      ? {
          filters: {
            mode: 'all',
            gender: 'any',
            cities: [],
            categories: [],
            q: '',
            ...preloaded
          }
        }
      : undefined
  });

function FeedWithFilters() {
  const filters = useSelector(selectFilters);
  const users: IUser[] = mock.users as unknown as IUser[];
  const skills: ISkill[] = mock.skills as unknown as ISkill[];

  const filtered = applyFilters(users as any, filters, skills as any);
  return <CardsFeed usersData={filtered as any} skillsData={skills as any} />;
}

const withStore =
  (node: React.ReactNode, preloaded?: Partial<FiltersState>) => () => (
    <Provider store={makeStore(preloaded)}>{node}</Provider>
  );

const meta: Meta<typeof FiltersPanel> = {
  title: 'Widgets/FiltersPanel',
  component: FiltersPanel
};
export default meta;

type Story = StoryObj<typeof FiltersPanel>;

/** Только панель */
export const Default: Story = {
  decorators: [withStore(<FiltersPanel />)]
};

/** Панель + Фид с моками и реальной фильтрацией */
export const WithFeed: Story = {
  decorators: [
    withStore(
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: 24,
          padding: 16
        }}
      >
        <div>
          <FiltersPanel />
        </div>
        <div>
          <FeedWithFilters />
        </div>
      </div>
    )
  ]
};
