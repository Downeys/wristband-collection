import Image from 'next/image';
import PlayButton from "../buttons/PlayButton";
import Label from "../text/Label";
import Link from "next/link";
import { TrackData } from '@/models/types';

export interface TrackProps extends TrackData {
    trackIndex: number;
}

export const Track: React.FC<TrackProps> = ({ trackIndex, id, picSrc, bandName, trackName }) => {
    const uri = `?inFocus=${id}`;
    return (
        <Link href={uri} replace scroll={false} className="flex flex-row h-32 w-full justify-between content-center items-center">
            <div className="flex">
                <div className="min-h-24 min-w-24 justify-center content-center">
                    <Image src={picSrc} alt="Album Art" height="96" width="96" />
                </div>
                <div className="flex-col ml-2">
                    <Label text={bandName} semibold size='lg' />
                    <Label text={trackName} />
                </div>
            </div>
            <div className="flex justify-center content-center">
                <PlayButton variant="track" trackIndex={trackIndex} trackId={id} />
            </div>
        </Link>
    )
}

export default Track