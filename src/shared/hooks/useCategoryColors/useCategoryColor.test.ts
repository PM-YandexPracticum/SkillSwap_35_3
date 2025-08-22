import { renderHook } from '@testing-library/react';
import { useCategoryColors } from './useCategoryColors';
import * as categoryColors from '@/shared/lib/constants/categoryColors';

describe('useCategoryColors', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('возвращает цвет субкатегории, если он не DEFAULT_COLOR', () => {
    jest.spyOn(categoryColors, 'getSubcategoryColor').mockReturnValue('red');
    jest
      .spyOn(categoryColors, 'getCategoryColor')
      .mockReturnValue(categoryColors.DEFAULT_COLOR);

    const { result } = renderHook(() =>
      useCategoryColors('someCategory', 'someSubcategory')
    );
    expect(result.current).toBe('red');
  });

  it('возвращает цвет категории, если цвет субкатегории DEFAULT_COLOR', () => {
    jest
      .spyOn(categoryColors, 'getSubcategoryColor')
      .mockReturnValue(categoryColors.DEFAULT_COLOR);
    jest.spyOn(categoryColors, 'getCategoryColor').mockReturnValue('blue');

    const { result } = renderHook(() =>
      useCategoryColors('someCategory', 'someSubcategory')
    );
    expect(result.current).toBe('blue');
  });

  it('возвращает fallback, если цвета субкатегории и категории DEFAULT_COLOR', () => {
    jest
      .spyOn(categoryColors, 'getSubcategoryColor')
      .mockReturnValue(categoryColors.DEFAULT_COLOR);
    jest
      .spyOn(categoryColors, 'getCategoryColor')
      .mockReturnValue(categoryColors.DEFAULT_COLOR);

    const { result } = renderHook(() =>
      useCategoryColors('someCategory', 'someSubcategory', {
        fallback: 'green'
      })
    );
    expect(result.current).toBe('green');
  });

  it('возвращает DEFAULT_COLOR, если нет категории, субкатегории и fallback', () => {
    jest
      .spyOn(categoryColors, 'getSubcategoryColor')
      .mockReturnValue(categoryColors.DEFAULT_COLOR);
    jest
      .spyOn(categoryColors, 'getCategoryColor')
      .mockReturnValue(categoryColors.DEFAULT_COLOR);

    const { result } = renderHook(() => useCategoryColors());
    expect(result.current).toBe(categoryColors.DEFAULT_COLOR);
  });
});
