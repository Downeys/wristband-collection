import React from 'react';
import ShareIcon from '@/common/components/icons/ShareIcon';

export const ShareButton: React.FC = () => {
  return (
    <div className={`flex flex-col items-center justify-center h-10 w-10`}>
      <ShareIcon />
    </div>
  );
};

export default ShareButton;
