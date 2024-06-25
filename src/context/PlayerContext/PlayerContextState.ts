import { PlayerStatus } from "@/components/constants/PlayerStatusEnum";
import { TrackData } from "@/models/types";

export interface PlayerContextState {
    trackInPlayer: TrackData | null;
    playerStatus: PlayerStatus;
    back: () => void;
    next: () => void;
}