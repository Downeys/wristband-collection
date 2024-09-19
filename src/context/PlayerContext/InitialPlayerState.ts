import { TrackData } from "@/models/types";
import { PlayerContextState } from "./PlayerContextState";
import { PlayerStatus } from '@/types/playerStatusEnum';

export const InitialPlayerState: PlayerContextState = {
    trackInPlayer: {} as TrackData,
    playerStatus: PlayerStatus.uninitiated,
    index: 0,
    back: () => {},
    next: () => {},
}