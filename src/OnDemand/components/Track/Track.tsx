import Image from 'next/image';
import PlayButton from '@/common/components/buttons/PlayButton';
import Link from 'next/link';
import { TrackData } from '@/models/types';
import { Label } from '@/common/components/text/Label';
import { PlayerStatus } from '@/common/types/playerStatusEnum';
import { constructPlayerStatusAction } from '@/Home/utils/helpers/searchParamHelpers';
import initTranslations from '@/common/utils/i18n/i18n';
import { SearchParams } from '@/Home/constants/playerContextConstants';

export interface TrackProps extends TrackData {
  playerStatus: PlayerStatus;
  trackInPlayer: string;
  trackInFocus?: string;
  orderParam: string;
  locale: string;
}

export const Track: React.FC<TrackProps> = async ({ playerStatus, trackInFocus, trackInPlayer, id, picSrc, bandName, trackName, orderParam, locale }) => {
  const { t } = await initTranslations(locale, ['home']);
  const isInPlayer = trackInPlayer === id;
  const isInFocus = trackInFocus === id;
  const showPlayButton = isInFocus || isInPlayer;
  const playButtonStatus = isInPlayer ? playerStatus : PlayerStatus.paused;
  const playerStatusParam = constructPlayerStatusAction(playerStatus, id);
  const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;
  const uri = `?${PLAYER_STATUS}=${playerStatusParam}&${IN_FOCUS}=${id}&${ORDER}=${orderParam}`;
  return (
    <Link href={uri} replace={true} scroll={false} className="flex flex-row h-32 w-full justify-between content-center items-center">
      <div className="flex">
        <div className="min-h-24 min-w-24 justify-center content-center">
          <Image src={picSrc} alt="Album Art" height="96" width="96" />
        </div>
        <div className="flex-col ml-2">
          <Label text={bandName} semibold size="lg" />
          <Label text={trackName} />
        </div>
      </div>
      {showPlayButton && (
        <div className="flex justify-center content-center">
          <PlayButton variant="track" trackId={id} status={playButtonStatus} />
        </div>
      )}
    </Link>
  );
};

export default Track;
