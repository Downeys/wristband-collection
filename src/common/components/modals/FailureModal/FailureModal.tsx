import React from 'react';
import Label from '../../text/Label/Label';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '../../../constants/i18nConstants';
import styles from './FailureModal.module.scss';

interface FailureModalProps {
  message: string;
  showModal: boolean;
  onRetry: () => void;
  onCancel: () => void;
}

export const FailureModal = ({ message, showModal, onRetry, onCancel }: FailureModalProps) => {
  const { t } = useTranslation(Namespaces.COMMON);
  if (!showModal) return null;
  window.scrollTo(0, 0);
  return (
    <div className={styles.screenOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.contentContainer}>
          <Label text={message} bold size="lg" />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onCancel}>
            <Label text={t('cancelButton')} bold />
          </button>
          <button className={styles.retryButton} onClick={onRetry}>
            <Label text={t('retryButton')} bold />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailureModal;
