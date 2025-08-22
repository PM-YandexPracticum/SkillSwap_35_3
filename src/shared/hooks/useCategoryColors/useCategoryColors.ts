import { useMemo } from 'react';
import {
  DEFAULT_COLOR,
  getCategoryColor,
  getSubcategoryColor
} from '../../lib/constants/categoryColors';

export function useCategoryColors(
  category?: string | null,
  subcategory?: string | null,
  options?: { fallback?: string }
) {
  return useMemo(() => {
    if (subcategory) {
      const c = getSubcategoryColor(subcategory);
      if (c !== DEFAULT_COLOR) return c;
    }
    if (category) {
      const c = getCategoryColor(category);
      if (c !== DEFAULT_COLOR) return c;
    }
    return options?.fallback ?? DEFAULT_COLOR;
  }, [category, subcategory, options?.fallback]);
}
