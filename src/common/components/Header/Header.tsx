import React from 'react';
import Heading from '../text/Heading/Heading';
import Image from 'next/image';
import { APP_TITLE } from '../../constants/metadataConstants';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import { MenuItem } from '../../types/types';
import { getAboutLink, getContactLink, getHomeLink, getOnDemandLink, getSubmitLink } from '../../utils/helpers/linkHelpers';
import initTranslations from '../../utils/i18n/i18n';
import styles from './Header.module.scss';

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
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Image height={75} width={75} src="/logo.png" alt="logo" />
        <Heading text={APP_TITLE} size="2xl" additionalStyles={styles.companyName} />
      </div>
      <input id="menuToggle" className={styles.menuToggle} type="checkbox" />
      <label className={styles.menuButtonContainer} htmlFor="menuToggle">
        <div className={styles.menuButton} />
      </label>

      <HeaderMenu menuItems={menuItems} />
    </div>
  );
};
