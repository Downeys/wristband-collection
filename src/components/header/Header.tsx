import Heading from "../text/Heading"
import Image from 'next/image';
import Label from "../text/Label";

export const Header: React.FC = () => {
    return (
        <div className="h-20 w-screen flex flex-row justify-between items-center bg-slate-950 text-white shadow-header fixed top-0 z-10">
            <div className="flex flex-row items-center">
                <Image height={75} width={75} src='/logo.png' alt="logo" />
                <Heading text="The Wristband Collection" size="xl" additionalStyles="lg:text-4xl md:text-2xl" />
            </div>
            <input id="menu-toggle" type="checkbox" />
            <label className='menu-button-container' htmlFor="menu-toggle">
                <div className='menu-button'></div>
            </label>
            <ul className="menu">
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-music-button" className="header-link" type="button" href="https://wristbandradio.com">
                            <Label text="Music" semibold font="primary" color="black" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-contact-button" className="header-link" type="button" href="https://wristbandradio.com/submit">
                            <Label text="Submit" semibold font="primary" color="black" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-about-button" className="header-link" type="button" href="https://thewristbandcollection.com">
                            <Label text="About" semibold font="primary" color="black" />
                        </a>
                    </div>
                </li>
                <li className="menu-item-container">
                    <div className="header-link-container">
                        <a id="header-contact-button" className="header-link" type="button" href="https://wristbandradio.com/contact">
                            <Label text="Contact" semibold font="primary" color="black" />
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    )
}