import { TrackData } from "@/models/types";

interface OrderObj {
    random: number;
    index: number;
}

export const getRandomizedOrder = (trackList: TrackData[]): number[] => {
    const orderList: OrderObj[] = [];
    for (let i = 0; i < trackList.length; i++) {
        const random = Math.floor(Math.random() * 100);
        orderList.push({ random, index: i });
    }
    const sortedOrderList = orderList.sort((a, b) => a.random - b.random);
    return sortedOrderList.map(item => item.index);
}

export const sortPlaylistByOrderList = (trackList: TrackData[], orderList: number[]): TrackData[] => {
    const randomlyOrderedTrackList: TrackData[] = [];
    for (let i = 0; i < trackList.length; i++) {
        randomlyOrderedTrackList.push(trackList[orderList[i]])
    }
    return randomlyOrderedTrackList;
}

export const sortPlaylistByPosition = (tracks: TrackData[]): TrackData[] => {
    return tracks.sort((a, b) => a.position - b.position);
}