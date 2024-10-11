"use client"

import { IconProps } from "@/common/types/types"

export const SkipIcon: React.FC<IconProps> = (props) =>
    <span onClick={() => props.onClick && props.onClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" className={props.styling || "h-8 w-8"} viewBox="0 0 512 512">
            <path d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z" fill="#06E7EC" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
            <path fill="none" stroke="#06E7EC" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M400 80v352"/>
        </svg>
    </span>

export default SkipIcon
