'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/common/constants/i18nConstants';
import styles from './Spinner.module.scss';

export const Spinner = () => {
  const { t } = useTranslation(Namespaces.COMMON);
  return (
    <output className={styles.spinnerContainer}>
      <span className={styles.spinner}>{t('loading')}</span>
    </output>
  );
};

export default Spinner;
