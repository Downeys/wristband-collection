import Heading from "@/common/components/text/Heading"
import Image from 'next/image';
import Label from "@/common/components/text/Label";
import initTranslations from '@/common/utils/i18n/i18n';
import { getAboutLink, getContactLink, getHomeLink, getOnDemandLink, getSubmitLink } from "@/common/utils/helpers/linkHelpers";
import LanguageChanger from "@/common/utils/i18n/LanguageChanger";
import { APP_TITLE } from "@/common/constants/metadataConstants";

interface HeaderProps {
    locale: string;
}

export const Header: React.FC<HeaderProps> = async ({ locale }: HeaderProps) => {
    const { t } = await initTranslations(locale, ['common']);
    const homeLink = getHomeLink(locale);
    const contactLink = getContactLink(locale);
    const submitLink = getSubmitLink(locale);
    const aboutLink = getAboutLink(locale);
    const onDemandLink = getOnDemandLink(locale);
    return (
        <div className="h-20 w-screen flex flex-row justify-between items-center bg-slate-950 text-white shadow-header fixed top-0 z-10">
            <div className="flex flex-row items-center">
                <Image height={75} width={75} src='/logo.png' alt="logo" />
                <Heading text={APP_TITLE} size="2xl" additionalStyles="md:text-4xl sm:text-3xl" />
            </div>
            <input id="menu-toggle" type="checkbox" />
            <label className='menu-button-container' htmlFor="menu-toggle">
                <div className='menu-button'></div>
            </label>

            <ul className="menu">
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <LanguageChanger />
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-radio-button" className="header-link" type="button" href={homeLink}>
                            <Label text={t('radioLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-catelogue-button" className="header-link" type="button" href={onDemandLink}>
                            <Label text={t('catalogLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-contact-button" className="header-link" type="button" href={submitLink}>
                            <Label text={t('submitLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-about-button" className="header-link" type="button" href={aboutLink}>
                            <Label text={t('aboutLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-contact-button" className="header-link" type="button" href={contactLink}>
                            <Label text={t('contactLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    )
}