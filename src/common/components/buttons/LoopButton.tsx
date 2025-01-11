'use client';

import { useMemo, useCallback, useState } from 'react';
import LoopIcon from '../icons/LoopIcon';

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
  const shadowStyle = useMemo(() => (selected ? 'shadow-green' : 'shadow-pink'), [selected]);
  return (
    <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full ${shadowStyle}`} onClick={handleClick}>
      <LoopIcon />
    </button>
  );
};

export default LoopButton;
