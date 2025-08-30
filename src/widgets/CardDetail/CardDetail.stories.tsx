import type { Meta, StoryObj } from '@storybook/react';
import { CardDetail } from './CardDetail';
import mock from '@/api/mockData.json';

const mockSkill = mock.skills[0];

const meta: Meta<typeof CardDetail> = {
  title: 'widgets/CardDetail',
  component: CardDetail,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    skill: mockSkill
  }
};

export const LoadingOrNoData: Story = {
  args: {
    skill: null
  }
};
