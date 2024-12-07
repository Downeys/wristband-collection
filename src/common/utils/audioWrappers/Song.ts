import { PlayerStatus } from "@/common/types/playerStatusEnum";

export interface Song {
    currentTime: number;
    duration: number;
    progress: number;
    status: PlayerStatus;
    onUpdate: (song: Song) => void;
    pause: () => void;
    play: () => void;
    seek: (time: number) => void;
    unload: () => void;
};
