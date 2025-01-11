'use client';

import React from 'react';
import { IconProps } from '@/common/types/types';

export const NextIcon: React.FC<IconProps> = (props) => (
  <div className="flex flex-col items-center justify-center " onClick={() => props.onClick && props.onClick()}>
    <svg className={props.styling || 'h-5 w-6'} viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_106_12)">
        <path d="M0 0V18.75L15.625 9.375L0 0ZM15.625 9.375V18.75H21.875V0H15.625V9.375Z" fill="#06E7EC" />
      </g>
      <defs>
        <filter id="filter0_d_106_12" x="0" y="0" width="33" height="26.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.905882 0 0 0 0 0.92549 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_106_12" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_106_12" result="shape" />
        </filter>
      </defs>
    </svg>
  </div>
);

export default NextIcon;
