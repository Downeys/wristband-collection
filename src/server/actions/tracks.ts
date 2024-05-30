import { connectToDb } from "@/config/mongoRepo";
import { Track } from "@/models/track";
import { TrackData, TrackSchema } from "@/models/types";

export const getAllTracks = async (): Promise<TrackData[]> => {
    try {
        await connectToDb();
        // console.log(`getting tracks`)
        const tracks =  await Track.find();
        const returnVal = trackMapper(tracks);
        // console.log(`tracks found: ${tracks}`)
        return returnVal;
    } catch (e: any) {
        console.log(e.message)
        return [];
    };
}

const trackMapper = (tracks: TrackSchema[]): TrackData[] => tracks.map(track => ({
    id: `${track.id}`,
    trackName: track.trackName,
    bandName: track.bandName,
    audioSrc: track.audioSrc,
    picSrc: track.picSrc,
    buyLink: track.buyLink
}));