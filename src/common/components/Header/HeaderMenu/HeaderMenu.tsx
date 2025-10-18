'use client'

import React, { useMemo } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import HeaderMenuItem from "../HeaderMenuItem/HeaderMenuItem";
import { MenuItem } from "../../../types/types";
import styles from '../Header.module.scss';
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";

interface HeaderMenuProps {
    menuItems: MenuItem[];
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ menuItems }) => {
    const { user } = useUser();
    const visibleMenuItems = useMemo(() => user ? menuItems : menuItems.filter(item => !item.protected), [user, menuItems]);
    return (
        <ul className={styles.menu}>
            <li>
                <div className={styles.languageSelectorContainer}>
                    <LanguageSelector />
                </div>
            </li>
            {visibleMenuItems.map((menuItem, idx) => <HeaderMenuItem key={`${menuItem}-${idx}`} label={menuItem.label} link={menuItem.link} />)}
        </ul>
    )
}

export default HeaderMenu;