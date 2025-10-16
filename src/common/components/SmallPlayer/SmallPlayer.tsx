'use client';

import React, { useCallback, useContext, useMemo } from 'react';
import { Label } from '../text/Label/Label';
import { BackButton } from '../buttons/BackButton/BackButton';
import { NextButton } from '../buttons/NextButton/NextButton';
import { PlayButton } from '../buttons/PlayButton/PlayButton';
import { PlayListContext } from '../../context/player/PlayerContextProvider';
import { RandomizeButton } from '../buttons/RandomizeButton/RandomizeButton';
import { LoopButton } from '../buttons/LoopButton/LoopButton';
import { TrackBar } from './TrackBar/TrackBar';
import styles from './SmallPlayer.module.scss';

export interface SmallPlayerProps {
  play?: boolean;
  next?: boolean;
  back?: boolean;
  shuffle?: boolean;
  loop?: boolean;
}

export const SmallPlayer: React.FC<SmallPlayerProps> = ({ play: showPlay, next: showNext, back: showBack, shuffle: showRandomize, loop: showLoop }) => {
  const { trackInPlayer, playerStatus, progress, duration, currentTime, back, next, seek, shuffle } = useContext(PlayListContext);
  const trackMessage = useMemo(() => (trackInPlayer?.bandName ? `${trackInPlayer?.bandName} - ${trackInPlayer?.trackName}` : 'Welcome to Wristband Radio'), [trackInPlayer]);
  const handleSeek = useCallback((time: number) => seek(time), [seek]);
  const handleShuffle = useCallback((random: boolean) => shuffle(random), [shuffle]);
  return (
    <div className={styles.smallPlayerContainer}>
      <div className={styles.trackMEssageContainer}>
        <Label text={trackMessage} size="lg" bold />
      </div>
      <TrackBar duration={duration} progress={progress} currentTime={currentTime} onSeek={handleSeek} />
      <div className={styles.buttonContainer}>
        <div className={styles.buttonPanel}>
          {showBack && (
            <div className={styles.topButtonContainer}>
              <BackButton onClick={back} />
            </div>
          )}
          {showLoop ? (
            <div className={styles.bottomButtonContainer}>
              <LoopButton onClick={(shouldLoop: boolean) => {}} />
            </div>
          ) : (
            <div className={styles.emptySpace} />
          )}
        </div>
        {showPlay && <PlayButton status={playerStatus} trackId={trackInPlayer?.id} />}
        <div className={styles.buttonPanel}>
          {showNext && (
            <div className={styles.topButtonContainer}>
              <NextButton onClick={next} />
            </div>
          )}
          {showRandomize ? (
            <div className={styles.bottomButtonContainer}>
              <RandomizeButton onClick={handleShuffle} />
            </div>
          ) : (
            <div className={styles.emptySpace} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallPlayer;
