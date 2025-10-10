import Image from 'next/image';
import React from 'react';
import initTranslations from '../common/utils/i18n/i18n';
import config from '../common/config/config';
import SubmitSection from './components/pageSections/SubmitSection/SubmitSection';
import AboutMeSection from './components/pageSections/AboutMeSection/AboutMeSection';
import ComingSoonSection from './components/pageSections/ComingSoonSection/ComingSoonSection';
import { Namespaces } from '../common/constants/i18nConstants';
import RecentUpdatesSection from './components/pageSections/RecentUpdatesSection/RecentUpdatesSection';
import LongTermDirectionSection from './components/pageSections/LongTermDirectionSection/LongTermDirectionSection';
import styles from './AboutPage.module.scss'

interface AboutPageProps {
  locale: string;
}

export const AboutPage = async ({ locale }: AboutPageProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  const { links } = config;
  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.panelContainer}>
          <SubmitSection locale={locale} />
          <div className={styles.leftImageContainer}>
            <Image src={links.picOfMeLink} alt={t('picOfMeAltText')} width={605} height={805} />
          </div>
          <AboutMeSection locale={locale} />
          <LongTermDirectionSection locale={locale} />
        </div>
        <div className={styles.panelContainer}>
          <div className={styles.rightImageContainer}>
            <Image src={links.picOfMeLink} alt={t('picOfMeAltText')} width={605} height={805} />
          </div>
          <RecentUpdatesSection locale={locale} />
          <ComingSoonSection locale={locale} />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
