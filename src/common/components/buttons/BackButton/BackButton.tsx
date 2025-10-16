'use client';

import React from 'react';
import BackIcon from '../../icons/BackIcon';
import styles from './BackButton.module.scss';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <button className={styles.backButton} onClick={onClick}>
    <BackIcon />
  </button>
);

export default BackButton;
