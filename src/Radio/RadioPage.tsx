'use client';

import React, { useContext, useMemo } from 'react';
import Image from 'next/image';
import { SmallPlayer } from '../common/components/SmallPlayer/SmallPlayer';
import { PlayListContext } from '../common/context/player/PlayerContextProvider';
import styles from './RadioPage.module.scss';

export const RadioPage: React.FC = () => {
  const { trackInPlayer } = useContext(PlayListContext);
  const picSrc = useMemo(() => trackInPlayer?.picSrc ?? '', [trackInPlayer]);
  return (
    <>
      <div className={styles.upperPanelContainer}>
        {picSrc && (
          <div className={styles.trackImageContainer}>
            <Image src={picSrc} alt="Album Art" height={320} width={320} />
          </div>
        )}
      </div>
      <div className={styles.playerContainer}>
        <SmallPlayer play next />
      </div>
    </>
  );
};

export default RadioPage;
