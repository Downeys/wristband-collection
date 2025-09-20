import React from 'react';
import Heading from '@/common/components/text/Heading';
import Image from 'next/image';
import { APP_TITLE } from '@/common/constants/metadataConstants';
import HeaderMenu from './HeaderMenu';
import { MenuItem } from '@/common/types/types';
import { getAboutLink, getContactLink, getHomeLink, getOnDemandLink, getSubmitLink } from '@/common/utils/helpers/linkHelpers';
import initTranslations from '@/common/utils/i18n/i18n';

interface HeaderProps {
  locale: string;
}

export const Header: React.FC<HeaderProps> = async ({ locale }: HeaderProps) => {
    const { t } = await initTranslations(locale, ['common']);
    const menuItems: MenuItem[] = [
        { label: t('radioLink'), link: getHomeLink(locale), protected: false},
        { label: t('catalogLink'), link: getOnDemandLink(locale), protected: true},
        { label: t('submitLink'), link: getSubmitLink(locale), protected: true},
        { label: t('aboutLink'), link: getAboutLink(locale), protected: false},
        { label: t('contactLink'), link: getContactLink(locale), protected: false},
        { label: t('loginLink'), link: '/auth/login', protected: false }
    ]
  return (
    <div className="h-20 w-screen flex flex-row justify-between items-center bg-slate-950 text-white shadow-header fixed top-0 z-10">
      <div className="flex flex-row items-center">
        <Image height={75} width={75} src="/logo.png" alt="logo" />
        <Heading text={APP_TITLE} size="2xl" additionalStyles="md:text-4xl sm:text-3xl" />
      </div>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button" />
      </label>

      <HeaderMenu menuItems={menuItems} />
    </div>
  );
};
