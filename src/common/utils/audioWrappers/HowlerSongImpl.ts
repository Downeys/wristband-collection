import { Howl } from "howler";
import { getWebmStreamUrl, getMp3StreamUrl } from "@/common/utils/helpers/howlHelpers";
import { PlayerStatus } from "@/common/types/playerStatusEnum";
import { Song } from "./Song";

const TICK_INTERVAL = 100; // controls how often the song fires it's update event while playing
const SEEK_MUTE_DELAY = 100; //controls how soon the song unmutes after seeking

export class HowlerSongImpl implements Song {
    status: PlayerStatus = PlayerStatus.uninitiated;
    duration: number = 0;
    currentTime: number = 0;
    progress: number = 0;
    tick: NodeJS.Timeout | null = null;
    howl: Howl;
    onUpdate: (song: Song) => void;

    constructor(fileName: string, onUpdate: (song: Song) => void, onEnd: () => void) {
        const howl = new Howl({
            src: [getWebmStreamUrl(fileName), getMp3StreamUrl(fileName)],
            format: ['webm', 'mp3'],
            html5: true,
            preload: true,
            onend: onEnd,
        })
        howl.once("load", this.onLoad);
        howl.on("seek", this.onSeek);
        howl.on("play", this.onPlay);
        howl.on("pause", this.onPause);

        this.howl = howl;
        this.onUpdate = onUpdate;
    }

    play = () => {
        if (!this.howl) return;
        this.howl.play();
    }

    pause = () => {
        if (!this.howl) return;
        this.howl.pause();
    }

    seek = (time: number) => {
        if (!this.howl) return;
        if (this.tick) clearTimeout(this.tick);
        if (this.status == PlayerStatus.playing) {
            this.howl.mute(true);
            this.howl.seek(time);
            this.tick = setTimeout(() => this.howl.mute(false), SEEK_MUTE_DELAY);
        }
        this.howl.seek(time);
    }

    unload = () => {
        if (!this.howl) return;
        this.howl.unload();
    }

    onLoad = () => {
        this.duration = this.howl.duration();
        this.onUpdate(this);
    }

    onPlay = () => {
        this.status = PlayerStatus.playing;
        this.tick = setTimeout(this.onTick, TICK_INTERVAL);
        this.onUpdate(this);
    }

    onPause = () => {
        this.status = PlayerStatus.paused;
        this.onUpdate(this);
    }

    onSeek = () => {
        this.currentTime = this.howl.seek();
        this.progress = (this.currentTime/this.duration) * TICK_INTERVAL;
        this.onUpdate(this);
    }

    onTick = () => {
        this.currentTime = this.howl.seek();
        this.progress = (this.currentTime/this.duration) * TICK_INTERVAL;
        this.onUpdate(this);
        if (this.howl.playing()) {
            setTimeout(this.onTick, 100);
        }
    }
}

export default HowlerSongImpl;
