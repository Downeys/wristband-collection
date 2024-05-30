import Image from 'next/image';
import PlayButton from "../buttons/PlayButton";
import Label from "../text/Label";
import Link from "next/link";
import { PlayerStatus } from "../constants/PlayerStatusEnum";
import { constructPlayerStatusAction } from "../utils/SearchParamHelpers";
import { TrackData } from '@/models/types';

export interface TrackProps extends TrackData {
    playerStatus: PlayerStatus;
    trackInFocus?: string;
    trackInPlayer?: string;
}

export const Track: React.FC<TrackProps> = ({ playerStatus, trackInFocus, trackInPlayer, id, picSrc, bandName, trackName }) => {
    const isInPlayer = trackInPlayer === id;
    const isInFocus = trackInFocus === id;
    const playButtonVisible = (isInPlayer && playerStatus === PlayerStatus.playing) || isInFocus;
    const playButtonStatus = isInPlayer ? playerStatus : PlayerStatus.paused;
    const playerStatusParam = constructPlayerStatusAction(playerStatus, trackInPlayer ?? id);
    const uri = `?playerStatus=${playerStatusParam}&inFocus=${id}`;
    return (
        <Link href={uri} className="flex flex-row h-22 w-full justify-between content-center items-center p-2">
            <div className="flex">
                <div className="h-14 w-14 justify-center content-center">
                    <Image src={picSrc} alt="Album Art" height="48" width="48" />
                </div>
                <div className="flex-col ml-2">
                    <Label text={bandName} semibold />
                    <Label text={trackName} size="sm" />
                </div>
            </div>
            {playButtonVisible && <div className="flex justify-center content-center">
                <PlayButton variant="track" trackId={id} status={playButtonStatus} />
            </div>}
        </Link>
    )
}

export default Track