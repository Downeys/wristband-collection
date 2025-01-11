'use client';

import NextIcon from '@/common/components/icons/NextIcon';

interface NextButtonProps {
  onClick: () => void;
}

export const NextButton: React.FC<NextButtonProps> = ({ onClick }) => (
  <button className={`flex flex-col items-center justify-center h-10 w-10 rounded-full shadow-pink mt-4`} onClick={onClick}>
    <NextIcon />
  </button>
);

export default NextButton;
