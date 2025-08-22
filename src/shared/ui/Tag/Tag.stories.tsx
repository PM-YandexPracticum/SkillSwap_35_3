import type { Meta, StoryObj } from '@storybook/react';
import Tag from './Tag';
import styles from './Tag.module.css';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tag',
  component: Tag,
  argTypes: {
    text: { control: 'text' },
    category: { control: 'text' },
    subcategory: { control: 'text' },
    style: { control: 'object' }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const SkillTitle: Story = {
  args: {
    text: 'Игра на барабанах',
    category: 'Творчество и искусство'
  }
};

export const Subcategory: Story = {
  args: {
    text: 'Медитация',
    category: 'Здоровье и лайфстайл',
    subcategory: 'Медитация'
  }
};

export const DefaultStyle: Story = {
  args: {
    text: '+2'
  }
};

export const TagRow: Story = {
  render: () => (
    <div className={styles['tag__row']}>
      <Tag
        text='Тайм менеджмент'
        category='Бизнес и карьера'
        subcategory='Тайм-менеджмент'
      />
      <Tag
        text='Медитация'
        category='Здоровье и лайфстайл'
        subcategory='Медитация'
      />
      <Tag text='+2' />
    </div>
  )
};
