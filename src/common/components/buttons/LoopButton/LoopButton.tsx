'use client';

import React, { useMemo, useCallback, useState } from 'react';
import LoopIcon from '../../icons/LoopIcon';
import styles from './LoopButton.module.scss';

interface LoopButtonProps {
  onClick: (selected: boolean) => void;
}

export const LoopButton: React.FC<LoopButtonProps> = ({ onClick }) => {
  const [selected, setSelected] = useState(false);
  const handleClick = useCallback(() => {
    const newSelectedState = !selected;
    setSelected(newSelectedState);
    onClick(newSelectedState);
  }, [selected, onClick]);
  const shadowStyle = useMemo(() => (selected ? styles.greenShadow : styles.pinkShadow), [selected]);
  return (
    <button className={`${styles.loopButton} ${shadowStyle}`} onClick={handleClick}>
      <LoopIcon />
    </button>
  );
};

export default LoopButton;
