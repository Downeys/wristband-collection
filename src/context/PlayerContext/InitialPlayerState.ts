import { TrackData } from "@/models/types";
import { PlayerContextState } from "./PlayerContextState";
import { PlayerStatus } from "@/components/constants/PlayerStatusEnum";

export const InitialPlayerState: PlayerContextState = {
    trackInPlayer: {} as TrackData,
    playerStatus: PlayerStatus.uninitiated,
    back: () => {},
    next: () => {},
}