import { TrackData } from "@/models/types";

interface OrderObj {
    random: number;
    index: number;
}

export const randomizePlaylist = (trackList: TrackData[]): TrackData[] => {
    const orderList: OrderObj[] = [];
    for (let i = 0; i < trackList.length; i++) {
        const random = Math.floor(Math.random() * 100);
        orderList.push({ random, index: i });
    }
    const sortedOrderList = orderList.sort((a, b) => a.random - b.random);
    const randomlyOrderedTrackList: TrackData[] = [];
    for (let i = 0; i < trackList.length; i++) {
        randomlyOrderedTrackList.push(trackList[sortedOrderList[i].index])
    }
    return randomlyOrderedTrackList;
}