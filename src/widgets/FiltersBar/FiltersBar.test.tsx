import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { FiltersBar } from './FiltersBar';

const users = [
  { id: 1, name: 'Аня', city: 'Москва', gender: 'f', canTeach: 'english', wantToLearn: ['math'] },
  { id: 2, name: 'Борис', city: 'СПб',    gender: 'm', canTeach: 'math',    wantToLearn: ['english'] },
];

describe('FiltersBar', () => {
  it('меняет результат при выборе категории и режима', async () => {
    const onChange = jest.fn();
    render(<FiltersBar users={users} onChange={onChange} />);

    await waitFor(() => expect(onChange).toHaveBeenCalled());

    const english = screen.getByLabelText('english', { selector: 'input[type="checkbox"]' });
    fireEvent.click(english);

    const teach = screen.getByLabelText('Могу научить', { selector: 'input[type="radio"]' });
    fireEvent.click(teach);

    const last = onChange.mock.calls.at(-1)?.[0] as any[];
    expect(last.map((u) => u.id)).toEqual([1]);
  });

  it('фильтр по полу (радио)', async () => {
    const onChange = jest.fn();
    render(<FiltersBar users={users} onChange={onChange} />);

    const female = screen.getByLabelText('Женский', { selector: 'input[type="radio"]' });
    fireEvent.click(female);

    const last = onChange.mock.calls.at(-1)?.[0] as any[];
    expect(last.map((u) => u.id)).toEqual([1]);
  });
});
