import { TrackData } from "@/models/types";
import { PlayerStatus } from "@/Home/types/playerStatusEnum";

export interface PlayerContextState {
    trackInPlayer: TrackData | null;
    playerStatus: PlayerStatus;
    index: number;
    progress: number;
    duration: number;
    currentTime: number;
    back: (status: string, inFocus: string, order: string) => void;
    next: (status: string, inFocus: string, order: string) => void;
    seek: (time: number) => void;
}