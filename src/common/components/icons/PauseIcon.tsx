'use client';

import React from 'react';
import { IconProps } from '../../../common/types/types';
import styles from './Icons.module.scss';

export const PauseIcon: React.FC<IconProps> = (props) => (
  <span onClick={() => props.onClick && props.onClick()}>
    <svg className={props.styling || styles.largeIcon} viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0V40H13.3333V0H0ZM26.6667 0V40H40V0H26.6667Z" fill={props.selected ? '#FF00FF' : '#FFFFFF'} />
    </svg>
  </span>
);

export default PauseIcon;
