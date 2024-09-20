import Image from 'next/image';
import PlayButton from "../buttons/PlayButton";
import Label from "../text/Label";
import Link from "next/link";
import { PlayerStatus } from '@/types/playerStatusEnum';
import { constructPlayerStatusAction } from "@/utils/helpers/SearchParamHelpers";
import { TrackData } from '@/models/types';

export interface TrackProps extends TrackData {
    playerStatus: PlayerStatus;
    trackIndex: number;
    trackInPlayer: number;
    trackInFocus?: string;
    orderParam: string;
}

export const Track: React.FC<TrackProps> = ({ playerStatus, trackIndex, trackInFocus, trackInPlayer, id, picSrc, bandName, trackName, orderParam }) => {
    const isInPlayer = trackInPlayer === trackIndex;
    const isInFocus = trackInFocus === id;
    const showPlayButton = isInFocus || isInPlayer;
    const playButtonStatus = isInPlayer ? playerStatus : PlayerStatus.paused;
    const playerStatusParam = constructPlayerStatusAction(playerStatus, trackInPlayer);
    const uri = `?playerStatus=${playerStatusParam}&inFocus=${id}&order=${orderParam}`;
    return (
        <Link href={uri} replace={true} scroll={false} className="flex flex-row h-32 w-full justify-between content-center items-center">
            <div className="flex">
                <div className="min-h-24 min-w-24 justify-center content-center">
                    <Image src={picSrc} alt="Album Art" height="96" width="96" />
                </div>
                <div className="flex-col ml-2">
                    <Label text={bandName} semibold size='lg' />
                    <Label text={trackName} />
                </div>
            </div>
            {showPlayButton && <div className="flex justify-center content-center">
                <PlayButton variant="track" trackIndex={trackIndex} status={playButtonStatus} />
            </div>}
        </Link>
    )
}

export default Track