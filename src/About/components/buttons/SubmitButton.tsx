import Link from 'next/link';
import React from 'react'
import initTranslations from '@/common/utils/i18n/i18n';
import { getSubmitLink } from '@/common/utils/helpers/linkHelpers';
import Font from "@/common/config/fonts"

interface SubmitButtonProps {
    locale: string;
}

export const SubmitButton = async ({ locale }: SubmitButtonProps) => {
    const { t } = await initTranslations(locale, ['about'])
    const submitLink = getSubmitLink(locale);
    return (
        <Link
            className={`${Font.primary.className} h-14 md:h-20 lg:h-28 w-3/4 bg-wbPink mb-6 sm:mb-3 mt-4 lg:my-12 flex justify-center items-center border-none rounded-3xl text-2xl md:text-3xl lg:text-4xl`}
            type="button"
            href={submitLink}>
                {t('submitButton')}
        </Link>
    )
}

export default SubmitButton;