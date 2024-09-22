import { TrackData } from "@/models/types";
import { PlayerStatus } from "@/Home/types/playerStatusEnum";

export interface PlayerContextState {
    trackInPlayer: TrackData | null;
    playerStatus: PlayerStatus;
    index: number;
    back: () => void;
    next: () => void;
}