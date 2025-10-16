'use client';

import React from 'react';
import { Spinner } from '../../Spinner/Spinner';
import Label from '../../text/Label/Label';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '../../../constants/i18nConstants';
import styles from './LoadingModal.module.scss';

interface LoadingModalProps {
  showModal: boolean;
}

export const LoadingModal = ({ showModal }: LoadingModalProps) => {
  const { t } = useTranslation(Namespaces.SUBMIT);
  if (!showModal) return null;
  window.scrollTo(0, 0);
  return (
    <div className={styles.screenOverlay}>
      <Label text={t('filesUploadingMessage')} bold size="lg" additionalStyles={styles.loadingMessage} />
      <Spinner />
    </div>
  );
};

export default LoadingModal;
