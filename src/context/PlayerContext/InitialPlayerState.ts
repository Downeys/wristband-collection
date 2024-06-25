import { TrackData } from "@/models/types";
import { PlayerContextState } from "./PlayerContextState";

export const InitialPlayerState: PlayerContextState = {
    trackInPlayer: {} as TrackData,
    back: () => {},
    next: () => {},
}