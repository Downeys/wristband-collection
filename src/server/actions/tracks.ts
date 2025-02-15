import { Track } from '@/models/track';
import { TrackData, TrackSchema } from '@/models/types';
import { connectToDb } from '@/server/config/mongoRepo';

export const getAllTracks = async (): Promise<TrackData[]> => {
  try {
    await connectToDb();
    const tracks = await Track.find();
    return trackMapper(tracks);
  } catch (e: any) {
    globalThis.logger?.error({
      err: e,
      message: 'Failed to fetch track list from db',
    });
    return [];
  }
};

const trackMapper = (tracks: TrackSchema[]): TrackData[] =>
  tracks.map((track) => ({
    id: `${track.id}`,
    trackName: track.trackName,
    bandName: track.bandName,
    audioSrc: track.audioSrc,
    picSrc: track.picSrc,
    buyLink: track.buyLink,
    position: track.position,
  }));
