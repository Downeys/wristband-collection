import React from 'react';
import Font from '@/common/config/fonts';
import initTranslations from '@/common/utils/i18n/i18n';
import Heading from '@/common/components/text/Heading';
import { Namespaces } from '@/common/constants/i18nConstants';

interface RecentUpdatesSectionProps {
  locale: string;
}

export const RecentUpdatesSection = async ({ locale }: RecentUpdatesSectionProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  return (
    <div className="flex flex-col items-start p-6">
      <Heading text={t('recentUpdatesHeader')} size="2xl" additionalStyles={`text-4xl mb-6 ${Font.secondary.className} font-semibold`} />
      <ul className="list-disc">
        <li className={`${Font.secondary.className} text-2xl lg:text-3xl text-white mb-9`}>{t('recentUpdates1')}</li>
        <li className={`${Font.secondary.className} text-2xl lg:text-3xl text-white mb-9`}>{t('recentUpdates2')}</li>
        <li className={`${Font.secondary.className} text-2xl lg:text-3xl text-white mb-9`}>{t('recentUpdates3')}</li>
        <li className={`${Font.secondary.className} text-2xl lg:text-3xl text-white mb-9`}>{t('recentUpdates4')}</li>
        <li className={`${Font.secondary.className} text-2xl lg:text-3xl text-white mb-9`}>{t('recentUpdates5')}</li>
      </ul>
    </div>
  );
};

export default RecentUpdatesSection;
