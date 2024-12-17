'use client'

import { useCallback, useContext, useMemo } from "react";
import { Label } from "@/common/components/text/Label";
import { BackButton } from "@/common/components/buttons/BackButton";
import { NextButton } from "@/common/components/buttons/NextButton";
import { PlayButton } from "@/common/components/buttons/PlayButton";
import Trackbar from "./Trackbar";
import { PlayListContext } from "@/common/context/player/PlayerContextProvider";

export interface SmallPlayerProps {
    play?: boolean;
    next?: boolean;
    back?: boolean;
}

export const SmallPlayer: React.FC<SmallPlayerProps> = ({ play: showPlay, next: showNext, back: showBack }) => {
    const { trackInPlayer, playerStatus, index, progress, duration, currentTime, back, next, seek } = useContext(PlayListContext);
    const trackMessage = useMemo(() => trackInPlayer?.bandName ? `${trackInPlayer?.bandName} - ${trackInPlayer?.trackName}` : 'Welcome to Wristband Radio', [trackInPlayer]);
    const handleSeek = useCallback((time: number) => seek(time), [seek])
    return (
        <div className="h-56 w-screen flex flex-col pt-2 px-6 bg-slate-950 shadow-footer justify-center">
            <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex flex-row">
                    <Label text={trackMessage} size="lg" bold />
                </div>
            </div>
            <Trackbar duration={duration} progress={progress} currentTime={currentTime} onSeek={handleSeek} />
            <div className="flex flex-row justify-center items-center pb-2">
                {showBack && <BackButton onClick={back}/>}
                {showPlay && <PlayButton trackIndex={index} status={playerStatus} />}
                {showNext && <NextButton onClick={next}/>}
            </div>
        </div>
    )
}

export default SmallPlayer;
