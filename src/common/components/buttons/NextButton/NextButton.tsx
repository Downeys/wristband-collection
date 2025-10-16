'use client';

import React from 'react';
import NextIcon from '../../icons/NextIcon';
import styles from './NextButton.module.scss';

interface NextButtonProps {
  onClick: () => void;
}

export const NextButton: React.FC<NextButtonProps> = ({ onClick }) => (
  <button className={styles.nextButton} onClick={onClick}>
    <NextIcon />
  </button>
);

export default NextButton;
