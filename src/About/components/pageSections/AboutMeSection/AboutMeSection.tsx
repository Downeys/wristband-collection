import React from 'react';
import { Heading } from '../../../../common/components/text/Heading/Heading';
import { Label } from '../../../../common/components/text/Label/Label';
import initTranslations from '../../../../common/utils/i18n/i18n';
import { Namespaces } from '../../../../common/constants/i18nConstants';
import Font from '../../../../common/config/fonts';
import styles from './AboutMeSection.module.scss';

interface AboutMeSectionProps {
  locale: string;
}

export const AboutMeSection = async ({ locale }: AboutMeSectionProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  return (
    <section>
      <Label alignment="center" size="lg" additionalStyles={styles.aboutMeLabel} text={t('aboutMe1')} />
      <Label alignment="center" size="lg" additionalStyles={styles.aboutMeLabel} text={t('aboutMe2')} />
      <Label alignment="center" size="lg" additionalStyles={styles.aboutMeLabel} text={t('aboutMe3')} />
      <div className={styles.missionStatementContainer}>
        <Heading size="xl" additionalStyles={`${styles.missionStatement} ${Font.secondary.className}`} text={t('missionStatement')} />
      </div>
    </section>
  );
};

export default AboutMeSection;