import { FullScreenModalProps } from './type';
import { useEscapeClose } from '@/shared/hooks';
import styles from './FullScreenModal.module.css';
import { Logo } from '../Logo';
import { Button } from '../Button';
import { Icon } from '../Icon';

export const FullScreenModal = ({
  isOpen,
  closeOnEsc = true,
  onClose,
  children
}: FullScreenModalProps) => {
  if (!isOpen) return null;

  useEscapeClose(() => {
    onClose();
  }, closeOnEsc && isOpen);

  return (
    <div className={styles.modal__fullscreen} role='dialog' aria-modal='true'>
      <div className={styles['modal__fullscreen-header']}>
        <Logo />
        <Button
          icon={<Icon name={'close-icon'}></Icon>}
          size='small'
          iconPosition='right'
          onClick={onClose}
          type='tertiary'
        >
          Закрыть
        </Button>
      </div>
      <div className={styles['modal__fullscreen-content']}>{children}</div>
    </div>
  );
};
