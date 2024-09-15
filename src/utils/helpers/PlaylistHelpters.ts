import { TrackData } from "@/models/types";

export const sortPlaylistByPosition = (tracks: TrackData[]): TrackData[] => {
    console.log(JSON.stringify(tracks))
    return tracks.sort((a, b) => a.position - b.position);
}