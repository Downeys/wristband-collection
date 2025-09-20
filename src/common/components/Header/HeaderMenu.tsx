'use client'

import LanguageChanger from "@/common/utils/i18n/LanguageChanger";
import React, { useMemo } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import HeaderMenuItem from "./HeaderMenuItem";
import { MenuItem } from "@/common/types/types";

interface HeaderMenuProps {
    menuItems: MenuItem[];
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ menuItems }) => {
    const { user } = useUser();
    const visibleMenuItems = useMemo(() => user ? menuItems : menuItems.filter(item => !item.protected), [user, menuItems]);
    return (
        <ul className="menu">
            <li className="menu-item-container">
                <div className="header-link-container">
                <LanguageChanger />
                </div>
            </li>
            {visibleMenuItems.map((menuItem, idx) => <HeaderMenuItem key={`${menuItem}-${idx}`} label={menuItem.label} link={menuItem.link} />)}
        </ul>
    )
}

export default HeaderMenu;