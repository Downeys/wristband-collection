import React from 'react'
import Font from "@/common/config/fonts"
import initTranslations from '@/common/utils/i18n/i18n';
import Heading from '@/common/components/text/Heading';
import Link from 'next/link';
import { getContactLink, getHomeLink } from '@/common/utils/helpers/linkHelpers';

interface ComingSoonSectionProps {
    locale: string;
}

export const ComingSoonSection = async  ({ locale }: ComingSoonSectionProps) => {
    const { t } = await initTranslations(locale, ['about'])
    const playerLink = getHomeLink(locale);
    const contactLink = getContactLink(locale);
    return (
        <div className='flex flex-col items-start p-6'>
            <Heading text={t('comingSoon')} size='2xl' additionalStyles={`text-4xl mb-6 ${Font.secondary.className} font-semibold`} />
            <ul className='list-disc'>
                <li className={`${Font.secondary.className} text-2xl lg:text-3xl text-white mb-9`}>{t('bullet1A')}<Link className={`${Font.secondary.className} text-lg md:text-2xl lg:text-3xl pt-4 text-wbBlue`} href={playerLink}>{t('bullet1Link')}</Link>{t('bullet1B')}</li>
                <li className={`${Font.secondary.className} text-2xl lg:text-3xl text-white mb-9`}>{t('bullet2')}</li>
                <li className={`${Font.secondary.className} text-2xl lg:text-3xl text-white mb-9`}>{t('bullet3A')}<Link className={`${Font.secondary.className} text-lg md:text-2xl lg:text-3xl pt-4 text-wbBlue`} href={contactLink}>{t('bullet3Link')}</Link>{t('bullet3B')}</li>
            </ul>
        </div>
    )
}

export default ComingSoonSection;