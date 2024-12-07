import { TrackData } from "@/models/types";
import { PlayerContextState } from "@/Home/context/PlayerContextState";
import { PlayerStatus } from "@/common/types/playerStatusEnum";

export const InitialPlayerState: PlayerContextState = {
    trackInPlayer: {} as TrackData,
    playerStatus: PlayerStatus.uninitiated,
    index: 0,
    progress: 0,
    duration: 0,
    currentTime: 0,
    back: () => {},
    next: () => {},
    seek: (time: number) => {}
}