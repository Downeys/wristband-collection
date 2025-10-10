import React from 'react';
import Font from '../../../../common/config/fonts';
import initTranslations from '../../../../common/utils/i18n/i18n';
import styles from './RecentUpdatesSection.module.scss';
import { Heading } from '../../../../common/components/text/Heading';
import { Namespaces } from '../../../../common/constants/i18nConstants';
import ListItem from '../../ListItem/ListItem';

interface RecentUpdatesSectionProps {
  locale: string;
}

export const RecentUpdatesSection = async ({ locale }: RecentUpdatesSectionProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  const listItems = [t('recentUpdates1'), t('recentUpdates2'), t('recentUpdates3'), t('recentUpdates4'), t('recentUpdates5')]
  return (
    <section className={styles.sectionContainer}>
      <Heading text={t('recentUpdatesHeader')} size="2xl" additionalStyles={`text-4xl mb-6 ${Font.secondary.className} font-semibold`} />
      <ul className={styles.bullettedList}>
        {listItems.map((item, idx) => <ListItem key={`${item}-${idx}`} message={item} />)}
      </ul>
    </section>
  );
};

export default RecentUpdatesSection;
