'use client';

import React, { MouseEventHandler, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PlayIcon from '../../icons/PlayIcon';
import PauseIcon from '../../icons/PauseIcon';
import Spinner from '../../Spinner/Spinner';
import { PlayerStatus } from '../../../types/playerStatusEnum';
import { constructPlayerStatusAction } from '../../../utils/helpers/searchParamHelpers';
import { SearchParams } from '../../../constants/playerContextConstants';
import styles from './PlayButton.module.scss';

export interface PlayButtonProps {
  variant?: 'primary' | 'track';
  trackId?: string;
  status: PlayerStatus;
  loading?: boolean;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ variant, trackId, status, loading }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPlaying = useMemo(() => status === PlayerStatus.playing, [status]);
  const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;
  const [inFocusParam, orderParam] = useMemo(() => [searchParams.get(IN_FOCUS), searchParams.get(ORDER)], [searchParams, IN_FOCUS, ORDER]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (orderParam && orderParam !== 'null') {
        const newStatus = isPlaying ? PlayerStatus.paused : PlayerStatus.playing;
        const newPlayerStatus = constructPlayerStatusAction(newStatus, trackId ?? '');
        router.replace(`?${PLAYER_STATUS}=${newPlayerStatus}&${IN_FOCUS}=${inFocusParam}&${ORDER}=${orderParam}`, { scroll: false });
      }
    },
    [router, isPlaying, inFocusParam, orderParam, trackId, PLAYER_STATUS, IN_FOCUS, ORDER]
  );

  const variantStyle = {
    primary: styles.primaryButton,
    track: styles.trackButton,
  };
  const iconStyling = {
    primary: styles.primaryIcon,
    track: styles.trackIcon,
  };
  const styleVariant = variant ?? 'primary';
  const Icon = useMemo(() => (isPlaying ? PauseIcon : PlayIcon), [isPlaying]);
  const isPink = styleVariant === 'primary';

  if (loading) return <Spinner />;

  return (
    <button className={`${styles.playButton} ${variantStyle[styleVariant]}`} onClick={handleClick}>
      <Icon styling={iconStyling[styleVariant]} selected={isPink} />
    </button>
  );
};

export default PlayButton;
