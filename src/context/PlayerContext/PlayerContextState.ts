import { TrackData } from "@/models/types";

export interface PlayerContextState {
    trackInPlayer: TrackData;
    history: TrackData[];
    playList: TrackData[];
    back: () => void;
    next: () => void;
}