import { TrackData } from "@/models/types";
import Image from 'next/image';
import PlayButton from "../buttons/PlayButton";
import Label from "../text/Label";
import Link from "next/link";
import { PlayerStatus } from "../constants/PlayerStatusEnum";
import { constructPlayerStatusAction } from "../utils/SearchParamHelpers";

export interface TrackProps extends TrackData {
    playerStatus: PlayerStatus;
    trackInFocus?: string;
    trackInPlayer?: string;
}

export const Track: React.FC<TrackProps> = ({ playerStatus, trackInFocus, trackInPlayer, trackId, imageHref, bandName, trackName }) => {
    const isInPlayer = trackInPlayer === trackId;
    const isInFocus = trackInFocus === trackId;
    const playButtonVisible = (isInPlayer && playerStatus === PlayerStatus.playing) || isInFocus;
    const playButtonStatus = isInPlayer ? playerStatus : PlayerStatus.paused;
    const playerStatusParam = constructPlayerStatusAction(playerStatus, trackInPlayer ?? trackId);
    const uri = `?playerStatus=${playerStatusParam}&inFocus=${trackId}`;
    return (
        <Link href={uri} className="flex flex-row h-22 w-full justify-between content-center items-center p-2">
            <div className="flex">
                <div className="h-14 w-14 justify-center content-center">
                    <Image src={imageHref} alt="Album Art" height="48" width="48" />
                </div>
                <div className="flex-col ml-2">
                    <Label text={bandName} semibold />
                    <Label text={trackName} size="sm" />
                </div>
            </div>
            {playButtonVisible && <div className="flex justify-center content-center">
                <PlayButton variant="track" trackId={trackId} status={playButtonStatus} />
            </div>}
        </Link>
    )
}

export default Track