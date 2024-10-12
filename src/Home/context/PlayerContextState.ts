import { TrackData } from "@/models/types";
import { PlayerStatus } from "@/Home/types/playerStatusEnum";

export interface PlayerContextState {
    trackInPlayer: TrackData | null;
    playerStatus: PlayerStatus;
    index: number;
    back: (status: string, inFocus: string, order: string) => void;
    next: (status: string, inFocus: string, order: string) => void;
}