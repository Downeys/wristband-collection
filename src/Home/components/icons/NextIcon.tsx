"use client"

import { IconProps } from "@/common/types/types"

export const NextIcon: React.FC<IconProps> = (props) =>
    <span onClick={() => props.onClick && props.onClick()}>
        <svg className={props.styling || "h-7 w-8"} viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_106_12)">
                <path d="M4 0V18.75L16.5 9.375L4 0ZM16.5 9.375V18.75L29 9.375L16.5 0V9.375Z" fill="#06E7EC"/>
            </g>
            <defs>
                <filter id="filter0_d_106_12" x="0" y="0" width="33" height="26.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.905882 0 0 0 0 0.92549 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_106_12"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_106_12" result="shape"/>
                </filter>
            </defs>
        </svg>
    </span>

export default NextIcon