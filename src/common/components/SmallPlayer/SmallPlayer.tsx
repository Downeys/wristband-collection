'use client';

import { useCallback, useContext, useMemo } from 'react';
import { Label } from '@/common/components/text/Label';
import { BackButton } from '@/common/components/buttons/BackButton';
import { NextButton } from '@/common/components/buttons/NextButton';
import { PlayButton } from '@/common/components/buttons/PlayButton';
import Trackbar from './Trackbar';
import { PlayListContext } from '@/common/context/player/PlayerContextProvider';
import RandomizeButton from '../buttons/RandomizeButton';
import LoopButton from '../buttons/LoopButton';

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
    <div className="h-56 w-screen flex flex-col px-6 bg-slate-950 shadow-footer justify-center">
      <div className="flex flex-row justify-between items-center mb-3">
        <div className="flex flex-row">
          <Label text={trackMessage} size="lg" bold />
        </div>
      </div>
      <Trackbar duration={duration} progress={progress} currentTime={currentTime} onSeek={handleSeek} />
      <div className="flex flex-row justify-center items-center pb-2">
        <div className="flex flex-col justify-center items-center">
          {showBack && (
            <div className="w-20 flex flex-row justify-start">
              <BackButton onClick={back} />
            </div>
          )}
          {showLoop ? (
            <div className="w-20 flex flex-row justify-end">
              <LoopButton onClick={(shouldLoop: boolean) => {}} />
            </div>
          ) : (
            <div className="h-10 w-20" />
          )}
        </div>
        {showPlay && <PlayButton status={playerStatus} trackId={trackInPlayer?.id} />}
        <div className="flex flex-col justify-center items-center">
          {showNext && (
            <div className="w-20 flex flex-row justify-end">
              <NextButton onClick={next} />
            </div>
          )}
          {showRandomize ? (
            <div className="w-20 flex flex-row justify-start">
              <RandomizeButton onClick={handleShuffle} />
            </div>
          ) : (
            <div className="h-10 w-20" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallPlayer;
