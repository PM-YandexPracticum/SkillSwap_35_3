import { ReactNode } from 'react';
import { IconName } from '../Icon';

export type AsideGalleryProps = { images: string[]; alt: string };

export type TModalType = 'success' | 'skill';
export type TModalLayout = 'centered' | 'split';
export type TActionsPlacement = 'footer' | 'left';

export type TModalUIProps = {
  isOpen: boolean;
  modalType: TModalType;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  bodyTitle?: string;
  category?: string;
  subcategory?: string;
  description?: string;
  statusIconName?: IconName;
  children?: ReactNode;
  aside?: ReactNode;
  actions?: ReactNode;
  actionsPlacement?: TActionsPlacement;
  layout?: TModalLayout;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  className?: string;
};
