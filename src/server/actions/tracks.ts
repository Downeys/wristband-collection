import { connectToDb } from "@/config/mongoRepo";
import { Track } from "@/models/track";
import { TrackData, TrackSchema } from "@/models/types";

export const getAllTracks = async (): Promise<TrackData[]> => {
    try {
        await connectToDb();
        const tracks =  await Track.find();
        return trackMapper(tracks);
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