import { PlayerStatus } from '@/types/PlayerStatusEnum';
import { TrackData } from "@/models/types";

export interface PlayerContextState {
    trackInPlayer: TrackData | null;
    playerStatus: PlayerStatus;
    index: number;
    back: () => void;
    next: () => void;
}