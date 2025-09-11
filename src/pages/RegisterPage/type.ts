import { formData } from '@/features/auth/RegistrationForm/type';
import { DropdownOption } from '@/shared/ui';

export interface RegisterPageProps {
  handleClose: () => void;
  formData: formData;
  city: DropdownOption[];
  gender: DropdownOption[];
  skills: DropdownOption[];
  subSkills: DropdownOption[];
  padded: boolean;
}
