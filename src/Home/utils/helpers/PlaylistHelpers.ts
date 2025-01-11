import { TrackData } from '@/models/types';

interface OrderObj {
  sortedIndex: number;
  index: number;
}

interface IndexedTrackData extends TrackData {
  index: number;
}

export const getRandomizedOrder = (trackList: TrackData[], startId?: string): number[] => {
  const orderList: OrderObj[] = [];
  let tracks: TrackData[] = [...trackList];
  if (startId) {
    const firstSong = tracks.filter((track) => track.id === startId)?.[0];
    const firstSongIndex = tracks.indexOf(firstSong);
    orderList.push({ sortedIndex: 0, index: firstSongIndex });
    tracks = tracks.filter((track) => track.id !== startId);
  }
  for (let i = 0; i < tracks.length; i++) {
    const random = Math.floor(Math.random() * 100);
    orderList.push({ sortedIndex: random, index: i });
  }
  const sortedOrderList = orderList.sort((a, b) => a.sortedIndex - b.sortedIndex);
  return sortedOrderList.map((item) => item.index);
};

export const getAlphebeticOrder = (trackList: TrackData[], startId?: string): number[] => {
  const orderList: IndexedTrackData[] = [];
  for (let i = 0; i < trackList.length; i++) {
    orderList.push({ ...trackList[i], index: i });
  }
  const sortedByTrackName = orderList.sort((a, b) => a.trackName.localeCompare(b.trackName));
  let sortedByBandName = sortedByTrackName.sort((a, b) => a.bandName.localeCompare(b.bandName));
  if (startId) {
    const firstSong = sortedByBandName.filter((track) => track.id === startId)?.[0];
    const firstSongIndex = sortedByBandName.indexOf(firstSong);
    sortedByBandName = [...sortedByBandName.slice(firstSongIndex), ...sortedByBandName.slice(0, firstSongIndex)];
  }
  return sortedByBandName.map((item) => item.index);
};

export const sortPlaylistByOrderList = (trackList: TrackData[], orderList: number[]): TrackData[] => {
  const sortedTrackList: TrackData[] = [];
  for (let i = 0; i < trackList.length; i++) {
    sortedTrackList.push(trackList[orderList[i]]);
  }
  return sortedTrackList;
};

export const getNextIndex = (currentIndex: number, playlist: TrackData[]) => (currentIndex + 1 === playlist.length ? 0 : currentIndex + 1);

export const formatTime = (secs: number): string => {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs - minutes * 60) || 0;

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
