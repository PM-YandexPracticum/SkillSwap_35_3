import { useMemo } from 'react';

export const useAge = (birthDate?: string | null): string => {
  return useMemo(() => {
    if (!birthDate) return '';

    const birth = new Date(birthDate);
    if (Number.isNaN(birth.getTime())) return '';

    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() >= birth.getDate());

    if (!hasHadBirthdayThisYear) {
      age -= 1;
    }

    if (age < 0) return '';

    const suffix = getYearSuffix(age);
    return `${age} ${suffix}`;
  }, [birthDate]);
};

function getYearSuffix(num: number): 'год' | 'года' | 'лет' {
  const abs = Math.abs(num);
  const lastTwo = abs % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return 'лет';
  switch (abs % 10) {
    case 1:
      return 'год';
    case 2:
    case 3:
    case 4:
      return 'года';
    default:
      return 'лет';
  }
}
