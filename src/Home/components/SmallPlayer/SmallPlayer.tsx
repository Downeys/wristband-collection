'use client'

import { ChangeEvent, ChangeEventHandler, useCallback, useContext, useMemo, useState } from "react";
import { Label } from "@/common/components/text/Label";
import { BackButton } from "@/Home/components/buttons/BackButton";
import { NextButton } from "@/Home/components//buttons/NextButton";
import { PlayButton } from "@/Home/components//buttons/PlayButton";
import { PlayListContext } from "@/Home/context/PlayerContextProvider";
import { formatTime } from "@/Home/utils/helpers/playlistHelpers";

export const SmallPlayer: React.FC = () => {
    const { trackInPlayer, playerStatus, index, progress, duration, currentTime, back, next, seek } = useContext(PlayListContext);
    const trackMessage = useMemo(() => trackInPlayer?.bandName ? `${trackInPlayer?.bandName} - ${trackInPlayer?.trackName}` : 'Welcome to Wristband Radio', [trackInPlayer]);
    const trackPosition = useMemo(() => {
        const current = formatTime(currentTime);
        const total = formatTime(duration);
        return `${current}/${total}`
    }, [currentTime, duration])
    const showTrackPosition = useMemo(() => duration > 0, [duration]);
    const [seekDebouncer, setSeekDebouncer] = useState<NodeJS.Timeout>();
    const handleSeek: ChangeEventHandler<HTMLInputElement> = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const time = +e.target.value;
        clearTimeout(seekDebouncer);
        setSeekDebouncer(setTimeout(() => seek(time), 100));
    }, [seek])

    return (
        <div className="h-56 w-screen flex flex-col pt-2 px-6 bg-slate-950 shadow-footer justify-center">
            <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex flex-row">
                    <Label text={trackMessage} size="lg" bold />
                </div>
            </div>
            <div className="flex flex-col">
                <input
                    className="w-full accent-wbBlue"
                    type="range"
                    min={0}
                    max={duration ?? 100}
                    step="0.01"
                    value={currentTime}
                    aria-valuemin={0}
                    aria-valuemax={duration ?? 100}
                    aria-valuenow={currentTime}
                    role="slider"
                    aria-label="volume"
                    aria-valuetext={`${progress}%`}
                    onChange={handleSeek}
                />
                <div className="flex flex-row justify-end h-5">
                    <Label text={showTrackPosition ? trackPosition : ''} />
                </div>
            </div>
            <div className="flex flex-row justify-center items-center pb-2">
                <BackButton onClick={back}/>
                <PlayButton trackIndex={index} status={playerStatus} />
                <NextButton onClick={next}/>
            </div>
        </div>
    )
}

export default SmallPlayer;
