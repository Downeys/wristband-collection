"use client"

import { useState, useMemo, useEffect } from "react";
import { IconProps } from "../../models/types"

export const PauseIcon: React.FC<IconProps> = (props) => {
    const [defaultColor, setDefaultColor] = useState("currentColor")
    const fillColor = useMemo(() => props.selected ? "#FF00FF" : defaultColor, [defaultColor]);
    useEffect(() => {
        const color = window.matchMedia('(prefers-color-scheme: dark)').matches ? "white" : "currentColor";
        setDefaultColor(color);
    }, [])

    return (
        <span onClick={() => props.onClick && props.onClick()}>
            <svg className={props.styling || "h-10 w-10"} viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0V40H13.3333V0H0ZM26.6667 0V40H40V0H26.6667Z" fill={fillColor}/>
            </svg>
        </span>
    )
}

export default PauseIcon