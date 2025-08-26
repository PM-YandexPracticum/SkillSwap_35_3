import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CityFilter } from './CityFilter';
import { CityFilterProps } from './type';

type StoryArgs = CityFilterProps;

const cities = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск'
];

export default {
  title: 'UI/CityFilter',
  component: CityFilter,
  argTypes: {
    onChange: { action: 'changed' }
  }
} as Meta<StoryArgs>;

export const Filter: StoryObj<StoryArgs> = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <CityFilter value={value} onChange={setValue} cities={cities} />;
  }
};
