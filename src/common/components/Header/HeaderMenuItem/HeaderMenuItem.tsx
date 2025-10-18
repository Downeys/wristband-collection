'use client'

import React from 'react'
import Label from '../../text/Label/Label';
import styles from '../Header.module.scss';

interface HeaderMenuItemProps {
    label: string;
    link: string;
}

export const HeaderMenuItem: React.FC<HeaderMenuItemProps> = ({ label, link }) => {
    return (
        <li>
            <div className={styles.headerLinkContainer}>
                <a className={styles.headerLink} type="button" href={link}>
                    <Label text={label} semibold font="primary" color="white" size='2xl' />
                </a>
            </div>
        </li>
)
}

export default HeaderMenuItem;