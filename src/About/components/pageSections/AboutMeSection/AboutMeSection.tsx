import React from 'react';
import { Heading } from '../../../../common/components/text/Heading';
import { Label } from '../../../../common/components/text/Label';
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
      <Label alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl mt-4`} text={t('aboutMe1')} />
      <Label alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl mt-4`} text={t('aboutMe2')} />
      <Label alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl mt-4`} text={t('aboutMe3')} />
      <div className={styles.missionStatementContainer}>
        <Heading size="xl" additionalStyles={`sm:text-2xl md:text-4xl p-1 text-center ${Font.secondary.className}`} text={t('missionStatement')} />
      </div>
    </section>
  );
};

export default AboutMeSection;