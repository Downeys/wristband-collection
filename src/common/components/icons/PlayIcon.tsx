'use client';

import { IconProps } from '@/common/types/types';

export const PlayIcon: React.FC<IconProps> = (props) => (
  <span onClick={() => props.onClick && props.onClick()}>
    <svg className={props.styling || 'h-11 w-10'} viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_106_4)">
        <path d="M4 0V44L44 22L4 0Z" fill={props.selected ? '#FF00FF' : '#FFFFFF'} />
      </g>
      <defs>
        <filter id="filter0_d_106_4" x="0" y="0" width="48" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_106_4" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_106_4" result="shape" />
        </filter>
      </defs>
    </svg>
  </span>
);

export default PlayIcon;
