'use client';

import React from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Font from '../../../config/fonts';
import { Namespaces } from '../../../constants/i18nConstants';
import styles from './LanguageSelector.module.scss';

export const LanguageSelector: React.FC = () => {
  const { t } = useTranslation(Namespaces.COMMON);
  const params = useParams();
  const currentLocale = params.locale;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newLocale = e.target.value;
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    router.replace(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));

    router.refresh();
  };

  return (
    <select onChange={handleChange} value={currentLocale} className={`${styles.languageSelector} ${Font.secondary.className}`}>
      <option value="en">{t('english')}</option>
      <option value="es">{t('spanish')}</option>
    </select>
  );
}

export default LanguageSelector;
