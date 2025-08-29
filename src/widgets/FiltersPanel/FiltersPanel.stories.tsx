import type { Meta, StoryObj, Decorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import filtersReducer, {
  type FiltersState
} from '@/entities/Filters/model/filtersSlice';
import { selectFilters } from '@/entities/Filters/model/filtersSelectors';
import applyFilters from '@/entities/Filters/lib/applyFilters';

import mock from '@/api/mockData.json';
import type { IUser, ISkill } from '@/api/types';

import { FiltersPanel } from './FiltersPanel';
import { CardsFeed } from '@/widgets/CardsFeed';
import { useSelector } from '@/app/store';

type MockShape = {
  users: IUser[];
  skills: ISkill[];
};
const typed = mock as unknown as MockShape;

const users: IUser[] = typed.users;
const skills: ISkill[] = typed.skills;

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
  const filtered = applyFilters(users, filters, skills);
  return <CardsFeed usersData={filtered} skillsData={skills} />;
}

// ИМЕНОВАННЫЙ декоратор — без displayName-свойств
const withReduxProvider: Decorator = function WithReduxProvider(Story) {
  return (
    <Provider store={makeStore()}>
      <Story />
    </Provider>
  );
};

const meta: Meta<typeof FiltersPanel> = {
  title: 'Widgets/FiltersPanel',
  component: FiltersPanel,
  decorators: [withReduxProvider]
};

export default meta;

type Story = StoryObj<typeof FiltersPanel>;

export const Default: Story = {};

export const WithFeed: Story = {};
WithFeed.render = function WithFeedRender() {
  return (
    <Provider store={makeStore()}>
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
    </Provider>
  );
};
