import { TrackData } from "@/models/types";
import { PlayerStatus } from "@/common/types/playerStatusEnum";
import { PlayerContextState } from "./PlayerContextState";

export const InitialPlayerState: PlayerContextState = {
    trackInPlayer: {} as TrackData,
    playerStatus: PlayerStatus.uninitiated,
    index: 0,
    progress: 0,
    duration: 0,
    currentTime: 0,
    playlist: [],
    back: () => {},
    next: () => {},
    seek: (time: number) => {},
    shuffle: (random: boolean) => {}
}