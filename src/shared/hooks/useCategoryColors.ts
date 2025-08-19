import { useMemo } from 'react';
import {
  CATEGORY_COLORS,
  SUBCATEGORY_COLORS,
  DEFAULT_COLOR,
  getCategoryColor,
  getSubcategoryColor
} from '../lib/constants/categoryColors';
export function useCategoryColors(
  category?: string | null,
  subcategory?: string | null,
  options?: { fallback?: string }
) {
  const color = useMemo(() => {
    if (subcategory) {
      const c = getSubcategoryColor(subcategory);
      if (c) return c;
    }
    if (category) {
      const c = getCategoryColor(category);
      if (c) return c;
    }
    return options?.fallback ?? DEFAULT_COLOR;
  }, [category, subcategory, options?.fallback]);

  return color;
}

export const categoryColors = CATEGORY_COLORS;
export const subcategoryColors = SUBCATEGORY_COLORS;
