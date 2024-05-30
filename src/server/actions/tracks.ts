import { connectToDb } from "@/config/mongoRepo";
import { Track } from "@/models/track";
import { TrackData } from "@/models/types";

export const getAllTracks = async (): Promise<TrackData[]> => {
    try {
        await connectToDb();
        console.log(`getting tracks`)
        const tracks =  await Track.find();
        console.log(`tracks found: ${tracks}`)
        return tracks;
    } catch (e: any) {
        console.log(e.message)
        return [];
    };
}