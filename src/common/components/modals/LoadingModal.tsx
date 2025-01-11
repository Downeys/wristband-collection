'use client';

import React from 'react';
import { Spinner } from '../Spinner/Spinner';
import Label from '../text/Label';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/common/constants/i18nConstants';

interface LoadingModalProps {
  showModal: boolean;
}

export const LoadingModal = ({ showModal }: LoadingModalProps) => {
  const { t } = useTranslation(Namespaces.SUBMIT);
  if (!showModal) return null;
  window.scrollTo(0, 0);
  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center pt-40 bg-slate-950 bg-opacity-90">
      <Label text={t('filesUploadingMessage')} bold size="lg" additionalStyles="mb-4" />
      <Spinner />
    </div>
  );
};

export default LoadingModal;
