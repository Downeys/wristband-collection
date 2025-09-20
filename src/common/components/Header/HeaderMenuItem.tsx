'use client'

import React from 'react'
import Label from '../text/Label';

interface HeaderMenuItemProps {
    label: string;
    link: string;
}

export const HeaderMenuItem: React.FC<HeaderMenuItemProps> = ({ label, link }) => {
    return (
        <li className="menu-item-container">
            <div className="header-link-container">
                <a id="header-radio-button" className="header-link" type="button" href={link}>
                    <Label text={label} semibold font="primary" color="white" />
                </a>
            </div>
        </li>
)
}

export default HeaderMenuItem;