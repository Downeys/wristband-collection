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
  const shadowStyle = useMemo(() => (selected ? 'greenShadow' : 'pinkShadow'), [selected]);
  return (
    <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full ${shadowStyle}`} onClick={handleClick}>
      <RandomizeIcon />
    </button>
  );
};

export default RandomizeButton;
