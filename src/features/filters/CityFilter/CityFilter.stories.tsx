import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CityFilter } from './CityFilter';
import { CityFilterProps } from './type';

type StoryArgs = CityFilterProps;

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
    return <CityFilter value={value} onChange={setValue} />;
  }
};
