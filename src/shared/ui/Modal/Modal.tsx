import { memo, useEffect, useRef } from 'react';
import styles from './modal.module.css';
import cn from 'classnames';
import { TModalUIProps } from './types';
import { ModalOverlayUI } from '../ModalOverlay';
import { Icon } from '../Icon';
import { Title } from '../Title';
import { useClickOutside } from '../../hooks/useClickOutside';

export const ModalUI = memo(function ModalUI({
  isOpen,
  modalType,
  title,
  subtitle,
  bodyTitle,
  category,
  subcategory,
  description,
  statusIconName,
  onClose,
  children,
  aside,
  actions,
  actionsPlacement = 'footer',
  layout,
  closeOnOverlay = true,
  closeOnEsc = true,
  className
}: TModalUIProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside([modalRef], {
    onClickOutside: onClose,
    enabled: Boolean(isOpen && closeOnOverlay)
  });

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const computedLayout =
    layout ?? (modalType === 'skill' ? 'split' : 'centered');

  const headingId = title ? `modal-title-${modalType}` : undefined;

  return (
    <ModalOverlayUI data-cy='modal-overlay'>
      <div
        ref={modalRef}
        className={cn(
          styles.modal,
          styles[`modal_type_${modalType}`],
          styles[`layout_${computedLayout}`],
          className
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby={headingId}
        data-cy='modal'
      >
        <div className={styles.header}>
          {modalType === 'success' && statusIconName && (
            <div className={styles.statusIcon} aria-hidden='true'>
              <Icon
                name={statusIconName}
                size={56}
                color='currentColor'
                fill='none'
              />
            </div>
          )}

          {title && (
            <Title
              as='h2'
              size='lg'
              id={headingId}
              className={styles.modalTitle}
            >
              {title}
            </Title>
          )}

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {computedLayout === 'split' ? (
          <div className={styles.split}>
            <div className={styles.leftCol}>
              {modalType === 'skill' && bodyTitle && (
                <Title as='h1' size='xl' className={styles.bodyTitle}>
                  {bodyTitle}
                </Title>
              )}
              {modalType === 'skill' && (
                <>
                  {(category || subcategory) && (
                    <p className={styles.meta}>
                      {category}
                      {category && subcategory ? ' / ' : ''}
                      {subcategory}
                    </p>
                  )}
                  {description && <p className={styles.desc}>{description}</p>}
                </>
              )}

              <div className={styles.content}>{children}</div>

              {actions && actionsPlacement === 'left' && (
                <div className={styles.actionsWrapper}>
                  <div className={cn(styles.actions, styles.actionsLeft)}>
                    {actions}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.rightCol}>{aside}</div>
          </div>
        ) : (
          <>
            <div className={styles.content}>{children}</div>
            {actions && <div className={styles.actions}>{actions}</div>}
          </>
        )}
      </div>
    </ModalOverlayUI>
  );
});
