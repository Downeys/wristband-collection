import React from 'react';
import { Heading } from '../../../../common/components/text/Heading';
import { Label } from '../../../../common/components/text/Label';
import { SubmitButton } from '../../buttons/SubmitButton';
import initTranslations from '@/common/utils/i18n/i18n';
import Font from '@/common/config/fonts';
import { Namespaces } from '@/common/constants/i18nConstants';
import styles from './SubmitSection.module.scss';

interface SubmitSectionProps {
  locale: string;
}

export const SubmitSection = async ({ locale }: SubmitSectionProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  return (
    <section className={styles.sectionContainer}>
      <Heading text={t('pageHeading')} size="2xl" additionalStyles={`md:text-4xl ${Font.secondary.className} font-semibold self-center`} />
      <Label text={t('pageSubHeading')} alignment="center" size="lg" additionalStyles={`md:text-2xl lg:text-3xl pt-4`} />
      <SubmitButton locale={locale} />
      <div className={styles.ownershipGuaranteeContainer}>
        <Label text={t('ownershipGuarantee')} alignment="center" additionalStyles="lg:text-2xl lg:mb-2" />
      </div>
    </section>
  );
};

export default SubmitSection;
