import reducer, {
  setMode,
  setGender,
  setCities,
  setQuery,
  toggleSkill,
  toggleCategory,
  resetFilters,
  type FiltersState
} from './filtersSlice';

const initial: FiltersState = {
  mode: 'all',
  gender: 'any',
  cities: [],
  categories: [],
  q: ''
};

describe('filtersSlice', () => {
  it('returns initial state by default', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initial);
  });

  it('handles setMode', () => {
    const next = reducer(initial, setMode('learn'));
    expect(next.mode).toBe('learn');
  });

  it('handles setGender', () => {
    const next = reducer(initial, setGender('male'));
    expect(next.gender).toBe('male');
  });

  it('handles setCities', () => {
    const next = reducer(initial, setCities(['Москва', 'Казань']));
    expect(next.cities).toEqual(['Москва', 'Казань']);
  });

  it('handles setQuery', () => {
    const next = reducer(initial, setQuery('react'));
    expect(next.q).toBe('react');
  });

  it('toggleSkill adds and removes single id', () => {
    const s1 = reducer(initial, toggleSkill('a'));
    expect(s1.categories).toEqual(['a']);

    const s2 = reducer(s1, toggleSkill('a'));
    expect(s2.categories).toEqual([]);
  });

  it('toggleCategory adds a whole batch, then removes it on repeat', () => {
    const batch = ['a', 'b', 'c'];

    const s1 = reducer(initial, toggleCategory({ subcategoryIds: batch }));
    expect([...s1.categories].sort()).toEqual(batch);

    const s2 = reducer(s1, toggleCategory({ subcategoryIds: batch }));
    expect(s2.categories).toEqual([]);
  });

  it('toggleCategory merges with existing and adds only missing', () => {
    const start: FiltersState = { ...initial, categories: ['a'] };
    const s1 = reducer(
      start,
      toggleCategory({ subcategoryIds: ['a', 'b', 'c'] })
    );
    expect([...s1.categories].sort()).toEqual(['a', 'b', 'c']);
  });

  it('resetFilters restores initial state', () => {
    const changed: FiltersState = {
      mode: 'teach',
      gender: 'female',
      cities: ['Казань'],
      categories: ['dev'],
      q: 'test'
    };
    expect(reducer(changed, resetFilters())).toEqual(initial);
  });
});
