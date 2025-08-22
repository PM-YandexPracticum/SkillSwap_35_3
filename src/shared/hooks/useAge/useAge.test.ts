import { renderHook } from '@testing-library/react';
import { useAge } from '../shared/hooks/useAge';

describe('useAge', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('должен возвращать пустую строку для null или undefined', () => {
    const { result: result1 } = renderHook(() => useAge(null));
    expect(result1.current).toBe('');

    const { result: result2 } = renderHook(() => useAge(undefined));
    expect(result2.current).toBe('');
  });

  it('должен возвращать пустую строку для невалидной даты', () => {
    const { result } = renderHook(() => useAge('invalid-date'));
    expect(result.current).toBe('');
  });

  it('должен правильно вычислять возраст для человека, у которого уже был день рождения в этом году', () => {
    const { result } = renderHook(() => useAge('1990-06-15'));
    expect(result.current).toBe('33 года');
  });

  it('должен правильно вычислять возраст для человека, у которого еще не было дня рождения в этом году', () => {
    const { result } = renderHook(() => useAge('1990-08-15'));
    expect(result.current).toBe('33 года');
  });

  it('должен правильно вычислять возраст для человека, у которого день рождения сегодня', () => {
    const { result } = renderHook(() => useAge('1990-01-15'));
    expect(result.current).toBe('34 года');
  });

  it('должен возвращать пустую строку для будущей даты рождения', () => {
    const { result } = renderHook(() => useAge('2030-01-15'));
    expect(result.current).toBe('');
  });

  describe('правильные суффиксы для возраста', () => {
    it('должен использовать "год" для возраста 1, 21, 31, 41, 51, 61, 71, 81, 91', () => {
      // Мокаем дату для получения нужного возраста
      jest.setSystemTime(new Date('2024-01-15'));

      const { result: result1 } = renderHook(() => useAge('2023-01-15'));
      expect(result1.current).toBe('1 год');

      const { result: result2 } = renderHook(() => useAge('2003-01-15'));
      expect(result2.current).toBe('21 год');

      const { result: result3 } = renderHook(() => useAge('1993-01-15'));
      expect(result3.current).toBe('31 год');
    });

    it('должен использовать "года" для возраста 2-4, 22-24, 32-34, 42-44, 52-54, 62-64, 72-74, 82-84, 92-94', () => {
      jest.setSystemTime(new Date('2024-01-15'));

      const { result: result1 } = renderHook(() => useAge('2022-01-15'));
      expect(result1.current).toBe('2 года');

      const { result: result2 } = renderHook(() => useAge('2021-01-15'));
      expect(result2.current).toBe('3 года');

      const { result: result3 } = renderHook(() => useAge('2020-01-15'));
      expect(result3.current).toBe('4 года');

      const { result: result4 } = renderHook(() => useAge('2002-01-15'));
      expect(result4.current).toBe('22 года');
    });

    it('должен использовать "лет" для возраста 5-20, 25-30, 35-40, 45-50, 55-60, 65-70, 75-80, 85-90, 95-100', () => {
      jest.setSystemTime(new Date('2024-01-15'));

      const { result: result1 } = renderHook(() => useAge('2019-01-15'));
      expect(result1.current).toBe('5 лет');

      const { result: result2 } = renderHook(() => useAge('2004-01-15'));
      expect(result2.current).toBe('20 лет');

      const { result: result3 } = renderHook(() => useAge('1999-01-15'));
      expect(result3.current).toBe('25 лет');

      const { result: result4 } = renderHook(() => useAge('1984-01-15'));
      expect(result4.current).toBe('40 лет');
    });

    it('должен использовать "лет" для возрастов 11-14', () => {
      jest.setSystemTime(new Date('2024-01-15'));

      const { result: result1 } = renderHook(() => useAge('2013-01-15'));
      expect(result1.current).toBe('11 лет');

      const { result: result2 } = renderHook(() => useAge('2012-01-15'));
      expect(result2.current).toBe('12 лет');

      const { result: result3 } = renderHook(() => useAge('2011-01-15'));
      expect(result3.current).toBe('13 лет');

      const { result: result4 } = renderHook(() => useAge('2010-01-15'));
      expect(result4.current).toBe('14 лет');
    });
  });

  it('должен обновлять результат при изменении birthDate', () => {
    const { result, rerender } = renderHook(
      ({ birthDate }: { birthDate: string | null }) => useAge(birthDate),
      { initialProps: { birthDate: '1990-01-15' as string | null } }
    );

    expect(result.current).toBe('34 года');

    rerender({ birthDate: '1985-01-15' as string | null });
    expect(result.current).toBe('39 лет');

    rerender({ birthDate: null });
    expect(result.current).toBe('');
  });

  it('должен работать с разными форматами даты', () => {
    const { result: result1 } = renderHook(() =>
      useAge('1990-01-15T00:00:00.000Z')
    );
    expect(result1.current).toBe('34 года');

    const { result: result2 } = renderHook(() =>
      useAge('1990-01-15T12:30:45.123Z')
    );
    expect(result2.current).toBe('34 года');
  });
});
