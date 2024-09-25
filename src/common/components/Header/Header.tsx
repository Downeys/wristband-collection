import Heading from "@/common/components/text/Heading"
import Image from 'next/image';
import Label from "@/common/components/text/Label";
import initTranslations from '@/common/utils/i18n';

interface HeaderProps {
    locale: string;
}

export const Header: React.FC<HeaderProps> = async ({ locale }: HeaderProps) => {
    const { t } = await initTranslations(locale, ['common']);
    return (
        <div className="h-20 w-screen flex flex-row justify-between items-center bg-slate-950 text-white shadow-header fixed top-0 z-10">
            <div className="flex flex-row items-center">
                <Image height={75} width={75} src='/logo.png' alt="logo" />
                <Heading text="The Wristband Collection" size="2xl" additionalStyles="md:text-4xl sm:text-3xl" />
            </div>
            <input id="menu-toggle" type="checkbox" />
            <label className='menu-button-container' htmlFor="menu-toggle">
                <div className='menu-button'></div>
            </label>
            <ul className="menu">
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-music-button" className="header-link" type="button" href="https://wristbandradio.com">
                            <Label text={t('musicLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-contact-button" className="header-link" type="button" href="https://wristbandradio.com/submit">
                            <Label text={t('submitLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-about-button" className="header-link" type="button" href="https://thewristbandcollection.com">
                            <Label text={t('aboutLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-contact-button" className="header-link" type="button" href="https://wristbandradio.com/contact">
                            <Label text={t('contactLink')} semibold font="primary" color="white" />
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    )
}