import reducer, {
  setMode,
  setGender,
  setCities,
  setCategories,
  setQuery,
  reset,
  type FiltersState,
} from './filtersSlice';

const initial: FiltersState = {
  mode: 'all',
  gender: 'any',
  cities: [],
  categories: [],
  q: '',
};

describe('filtersSlice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initial);
  });

  it('should handle setMode', () => {
    expect(reducer(initial, setMode('learn')).mode).toBe('learn');
  });

  it('should handle setGender', () => {
    expect(reducer(initial, setGender('male')).gender).toBe('male');
  });

  it('should handle setCities', () => {
    const next = reducer(initial, setCities(['Москва']));
    expect(next.cities).toEqual(['Москва']);
  });

  it('should handle setCategories', () => {
    const next = reducer(initial, setCategories(['design']));
    expect(next.categories).toEqual(['design']);
  });

  it('should handle setQuery', () => {
    expect(reducer(initial, setQuery('abc')).q).toBe('abc');
  });

  it('should reset to initial', () => {
    const changed = {
      mode: 'teach' as const,
      gender: 'female' as const,
      cities: ['Казань'],
      categories: ['dev'],
      q: 'test',
    };
    expect(reducer(changed, reset())).toEqual(initial);
  });
});
