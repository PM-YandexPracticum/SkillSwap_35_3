import { memo, useRef } from 'react';
import styles from './modal.module.css';
import cn from 'classnames';
import { TModalUIProps } from './types';
import { Icon, Title, ModalOverlayUI } from '@/shared/ui';
import { useClickOutside, useEscapeClose } from '@/shared/hooks';

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

  useEscapeClose(onClose, isOpen && closeOnEsc);

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
        <div className={styles.modal__header}>
          {modalType === 'success' && statusIconName && (
            <div className={styles.modal__icon} aria-hidden='true'>
              <Icon name={statusIconName} size={100} fill='none' />
            </div>
          )}
          <div className={styles.modal__content}>
            {title && (
              <Title
                as='h2'
                size='lg'
                id={headingId}
                className={styles.modal__title}
              >
                {title}
              </Title>
            )}
            {subtitle && <p className={styles.modal__subtitle}>{subtitle}</p>}
          </div>
        </div>

        {computedLayout === 'split' ? (
          <div className={styles.modal__layout_split}>
            <div className={styles[`modal__left-collumn`]}>
              <div className={styles[`modal__left-collumn_content`]}>
                {modalType === 'skill' && bodyTitle && (
                  <Title as='h1' size='xl' className={styles.bodyTitle}>
                    {bodyTitle}
                  </Title>
                )}
                {modalType === 'skill' && (
                  <>
                    {(category || subcategory) && (
                      <p className={styles.modal__meta}>
                        {category}
                        {category && subcategory ? ' / ' : ''}
                        {subcategory}
                      </p>
                    )}
                    {description && (
                      <p className={styles.modal__description}>{description}</p>
                    )}
                  </>
                )}
              </div>

              <div className={styles.modal__children}>{children}</div>
              {actions && actionsPlacement === 'left' && (
                <div
                  className={cn(
                    styles.modal__actions,
                    styles.modal__actions_placement_left
                  )}
                >
                  {actions}
                </div>
              )}
            </div>
            <div className={styles[`modal__right-collumn`]}>{aside}</div>
          </div>
        ) : (
          <>
            <div className={styles.modal__children}>{children}</div>
            {actions && <div className={styles.modal__actions}>{actions}</div>}
          </>
        )}
      </div>
    </ModalOverlayUI>
  );
});
