import { TrackData } from "@/models/types";
import { PlayerContextState } from "@/common/context/player/PlayerContextState";
import { PlayerStatus } from "@/Home/types/playerStatusEnum";

export const InitialPlayerState: PlayerContextState = {
    trackInPlayer: {} as TrackData,
    playerStatus: PlayerStatus.uninitiated,
    index: 0,
    back: () => {},
    next: () => {},
}