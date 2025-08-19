import type { Meta, StoryObj } from '@storybook/react';
import { useAge } from '@/shared/hooks';

const AgeView = ({ date }: { date: string }) => <div>{useAge(date)}</div>;

export default {
  title: 'hooks/useAge',
  component: AgeView
} satisfies Meta<typeof AgeView>;

export const Example: StoryObj<typeof AgeView> = {
  args: { date: '1991-11-21' }
};
