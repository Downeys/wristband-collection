'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Font from '@/common/config/fonts';
import { Namespaces } from '@/common/constants/i18nConstants';

export default function LanguageChanger() {
  const { t } = useTranslation(Namespaces.COMMON);
  const params = useParams();
  const currentLocale = params.locale;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e) => {
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
    <select onChange={handleChange} value={currentLocale} className={`bg-slate-950 p-1 ml-4 mr-1 ${Font.secondary.className}`}>
      <option value="en">{t('english')}</option>
      <option value="es">{t('spanish')}</option>
    </select>
  );
}
