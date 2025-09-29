import Image from 'next/image';
import React from 'react';
import initTranslations from '@/common/utils/i18n/i18n';
import config from '@/common/config/config';
import SubmitSection from './components/pageSections/SubmitSection';
import AboutMeSection from './components/pageSections/AboutMeSection';
import ComingSoonSection from './components/pageSections/ComingSoonSection';
import { Namespaces } from '@/common/constants/i18nConstants';
import RecentUpdatesSection from './components/pageSections/RecentUpdatesSection';
import LongTermDirectionSection from './components/pageSections/LongTermDirectionSection';

interface AboutPageProps {
  locale: string;
}

export const AboutPage = async ({ locale }: AboutPageProps) => {
  const { t } = await initTranslations(locale, [Namespaces.ABOUT]);
  const { links } = config;
  return (
    <main className="bg-slate-950 flex min-w-screen min-h-screen relative top-20 z-0">
      <div className="flex flex-col sm:flex-row p-2">
        <div className="w-full sm:w-1/2 p-3 lg:p-6 flex flex-col items-center">
          <SubmitSection locale={locale} />
          <div className="w-full flex justify-center sm:hidden">
            <Image src={links.picOfMeLink} alt={t('picOfMeAltText')} width={605} height={805} />
          </div>
          <AboutMeSection locale={locale} />
          <LongTermDirectionSection locale={locale} />
        </div>
        <div className="w-full sm:w-1/2 p-3 lg:p-6 flex flex-col items-center">
          <div className="hidden sm:flex justify-center w-full">
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
