import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { FiltersBar } from './FiltersBar';
import type { IUser, ISkill } from '@/api/types';

const makeSkill = (id: number | string, title: string): ISkill =>
  ({
    id,
    title,
    category: '',
    subcategory: '',
    images: [],
  } as ISkill);

const skills: ISkill[] = [
  makeSkill(1, 'english'),
  makeSkill(2, 'math'),
];

const users: IUser[] = [
  { id: 1 as any, name: 'Аня',   city: 'Москва', gender: 'female', ...( { teachIds: [1], learnIds: [2] } as any ) },
  { id: 2 as any, name: 'Борис', city: 'СПб',    gender: 'male',   ...( { teachIds: [2], learnIds: [1] } as any ) },
];

describe('FiltersBar', () => {
  it('меняет результат при выборе навыка и режима', async () => {
    const onChange = jest.fn();
    render(<FiltersBar users={users} skills={skills} onChange={onChange} />);

    await waitFor(() => expect(onChange).toHaveBeenCalled());

    const english = screen.getByLabelText('english', { selector: 'input[type="checkbox"]' });
    fireEvent.click(english);

    const teach = screen.getByLabelText('Могу научить', { selector: 'input[type="radio"]' });
    fireEvent.click(teach);

    const last = onChange.mock.calls.at(-1)?.[0] as IUser[];
    expect(last.map((u) => u.id)).toEqual([1]);
  });

  it('фильтр по полу (радио)', async () => {
    const onChange = jest.fn();
    render(<FiltersBar users={users} skills={skills} onChange={onChange} />);

    const female = screen.getByLabelText('Женский', { selector: 'input[type="radio"]' });
    fireEvent.click(female);

    const last = onChange.mock.calls.at(-1)?.[0] as IUser[];
    expect(last.map((u) => u.id)).toEqual([1]);
  });
});
