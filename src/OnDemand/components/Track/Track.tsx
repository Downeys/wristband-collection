import React from 'react';
import Image from 'next/image';
import { PlayButton } from '../../../common/components/buttons/PlayButton';
import Link from 'next/link';
import { TrackData } from '../../../models/types';
import { Label } from '../../../common/components/text/Label';
import { PlayerStatus } from '../../../common/types/playerStatusEnum';
import { constructPlayerStatusAction } from '../../../common/utils/helpers/searchParamHelpers';
import { SearchParams } from '../../../common/constants/playerContextConstants';
import styles from './Track.module.scss';

export interface TrackProps extends TrackData {
  playerStatus: PlayerStatus;
  trackInPlayer: string;
  trackInFocus?: string;
  orderParam: string;
}

export const Track: React.FC<TrackProps> = async ({ playerStatus, trackInFocus, trackInPlayer, id, picSrc, bandName, trackName, orderParam }) => {
  const isInPlayer = trackInPlayer === id;
  const isInFocus = trackInFocus === id;
  const showPlayButton = isInFocus || isInPlayer;
  const playButtonStatus = isInPlayer ? playerStatus : PlayerStatus.paused;
  const playerStatusParam = constructPlayerStatusAction(playerStatus, id);
  const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;
  const uri = `?${PLAYER_STATUS}=${playerStatusParam}&${IN_FOCUS}=${id}&${ORDER}=${orderParam}`;
  return (
    <Link href={uri} replace={true} scroll={false} className={styles.trackContainer}>
      <div className={styles.trackContentContainer}>
        <div className={styles.trackImageContainer}>
          <Image src={picSrc} alt="Album Art" height="96" width="96" />
        </div>
        <div className={styles.trackDetailsContainer}>
          <Label text={bandName} semibold size="lg" />
          <Label text={trackName} />
        </div>
      </div>
      {showPlayButton && (
        <div className={styles.playButtonContainer}>
          <PlayButton variant="track" trackId={id} status={playButtonStatus} />
        </div>
      )}
    </Link>
  );
};

export default Track;
