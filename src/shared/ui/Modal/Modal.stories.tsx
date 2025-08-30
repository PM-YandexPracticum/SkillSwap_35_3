import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalUI } from './Modal';
import type { TModalUIProps } from './types';
import { Button } from '../Button';
import mockData from '@/api/mockData.json';
import type { IMockData, ISkill, IUser } from '@/api/types';
import { AsideGallery } from './ModalAsideGallery';

type Story = StoryObj<typeof ModalUI>;

const meta: Meta<typeof ModalUI> = {
  title: 'UI/Modal',
  component: ModalUI,
  parameters: { layout: 'centered' },
  args: { isOpen: true, closeOnOverlay: true, closeOnEsc: true, className: '' }
};
export default meta;

function WithToggle({
  buttonLabel = 'Открыть модалку',
  ...modalProps
}: Omit<TModalUIProps, 'isOpen' | 'onClose'> & { buttonLabel?: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ minHeight: 520 }}>
      {!open && <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>}
      <ModalUI {...modalProps} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

const fallback: ISkill & { description: string } = {
  id: 0,
  title: 'Навык',
  category: '',
  subcategory: '',
  images: [],
  description: ''
};

const typedMockData = mockData as IMockData;

const skill: ISkill = typedMockData.skills?.[12] ?? fallback;

const teacher: IUser | null =
  typedMockData.users?.find((u) => u.teachingSkillId === skill.id) ?? null;

const desc: string = teacher?.about ?? '';

export const Success: Story = {
  name: 'Успех',
  args: {
    modalType: 'success',
    title: 'Ваше предложение создано',
    subtitle: 'Теперь вы можете предложить обмен',
    statusIconName: 'done-icon',
    actions: (
      <Button type='primary' fullWidth>
        Готово
      </Button>
    )
  },
  render: (args) => (
    <WithToggle {...args} buttonLabel='Открыть модалку успеха' />
  )
};

export const Skill: Story = {
  name: 'Навык',
  args: {
    modalType: 'skill',
    title: 'Ваше предложение',
    subtitle: 'Пожалуйста, проверьте и подтвердите правильность данных',
    actionsPlacement: 'left',
    bodyTitle: skill.title,
    category: skill.category,
    subcategory: skill.subcategory,
    description: desc,
    aside: <AsideGallery images={skill.images} alt={skill.title} />,
    actions: (
      <>
        <Button type='secondary' size='small' iconName='edit-icon'>
          Редактировать
        </Button>
        <Button type='primary' size='small'>
          Готово
        </Button>
      </>
    )
  },
  render: (args) => (
    <WithToggle {...args} buttonLabel='Открыть модалку навыка' />
  )
};
