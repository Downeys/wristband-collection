'use client';

import React from 'react';
import Label from '../../text/Label/Label';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '../../../constants/i18nConstants';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  message: string;
  showModal: boolean;
  onConfirm: () => void;
}

export const ConfirmationModal = ({ message, showModal, onConfirm }: ConfirmationModalProps) => {
  const { t } = useTranslation(Namespaces.COMMON);
  if (!showModal) return null;
  window.scrollTo(0, 0);
  return (
    <div className={styles.screenOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.contentContainer}>
          <Label text={message} bold size="lg" alignment="center" />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.okButton} onClick={onConfirm}>
            <Label text={t('okButton')} bold />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
