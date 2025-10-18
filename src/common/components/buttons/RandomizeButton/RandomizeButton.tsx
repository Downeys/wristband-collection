'use client';

import React, { useMemo, useCallback, useState } from 'react';
import RandomizeIcon from '../../icons/RandomizeIcon';
import styles from './RandomizeButton.module.scss';

interface RandomizeButtonProps {
  onClick: (random: boolean) => void;
}

export const RandomizeButton: React.FC<RandomizeButtonProps> = ({ onClick }) => {
  const [selected, setSelected] = useState(false);
  const handleClick = useCallback(() => {
    const newSelected = !selected;
    setSelected(newSelected);
    onClick(newSelected);
  }, [selected, onClick]);
  const shadowStyle = useMemo(() => (selected ? styles.greenShadow : styles.pinkShadow), [selected]);
  return (
    <button className={`${styles.randomizeButton} ${shadowStyle}`} onClick={handleClick}>
      <RandomizeIcon />
    </button>
  );
};

export default RandomizeButton;
