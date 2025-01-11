'use client';

import React from 'react';
import { IconProps } from '@/common/types/types';

export const LoopIcon: React.FC<IconProps> = (props) => (
  <span onClick={() => props.onClick && props.onClick()}>
    <svg className={props.styling || 'h-6 w-7'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.5 13L3.29592 12.0476C2.62895 8.93509 5.00172 6 8.18494 6H19M19 6L16 9M19 6L16 3M20.5 11L20.7041 11.9524C21.3711 15.0649 18.9983 18 15.8151 18H5M5 18L8 15M5 18L8 21"
        stroke="#06E7EC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default LoopIcon;
