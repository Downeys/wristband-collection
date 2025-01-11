'use client';

import { IconProps } from '@/common/types/types';

export const ShareIcon: React.FC<IconProps> = (props) => (
  <span onClick={() => props.onClick && props.onClick()}>
    <svg className={props.styling || 'h-7 w-8'} viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_107_18)">
        <path
          d="M19.625 6.75H20.125V6.25V1.16184L28.2926 8.89388L20.125 17.4971V12.5V12H19.625H16.5C13.2899 12 10.462 12.8193 8.21988 14.464C6.74187 15.5483 5.53422 16.9797 4.64255 18.7417C4.95492 15.5728 5.81102 12.9209 7.50577 10.9295C9.71801 8.33015 13.4539 6.75 19.625 6.75Z"
          fill="white"
          stroke="#06E7EC"
        />
      </g>
      <defs>
        <filter id="filter0_d_107_18" x="0" y="0" width="33" height="29.875" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.905882 0 0 0 0 0.92549 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_107_18" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_107_18" result="shape" />
        </filter>
      </defs>
    </svg>
  </span>
);

export default ShareIcon;
