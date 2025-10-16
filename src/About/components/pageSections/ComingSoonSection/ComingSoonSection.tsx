import React from 'react';
import Font from '../../../../common/config/fonts';
import initTranslations from '../../../../common/utils/i18n/i18n';
import { Heading } from '../../../../common/components/text/Heading/Heading';
import { Namespaces } from '../../../../common/constants/i18nConstants';
import styles from './ComingSoonSection.module.scss'
import { ListItem } from '../../ListItem/ListItem';

interface ComingSoonSectionProps {
  locale: string;
}

export const ComingSoonSection = async ({ locale }: ComingSoonSectionProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  const listItems = [t('comingSoon1'), t('comingSoon2'), t('comingSoon3')];
  return (
    <section className={styles.sectionContainer}>
      <Heading text={t('comingSoonHeader')} size="4xl" additionalStyles={`${styles.comingSoonHeading} ${Font.secondary.className}`} />
      <ul className={styles.bullettedList}>
        {listItems.map((item, idx) => <ListItem key={`${item}-${idx}`} message={item} />)}
      </ul>
    </section>
  );
};

export default ComingSoonSection;
