import React from 'react';
import ShareIcon from '../../icons/ShareIcon';
import styles from './ShareButton.module.scss';

export const ShareButton: React.FC = () => {
  return (
    <div className={styles.shareButton}>
      <ShareIcon />
    </div>
  );
};

export default ShareButton;
