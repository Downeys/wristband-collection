'use client'

import { ChangeEvent, ChangeEventHandler, useCallback, useContext, useMemo, useState } from "react";
import { Label } from "@/common/components/text/Label";
import { BackButton } from "@/Home/components/buttons/BackButton";
import { NextButton } from "@/Home/components//buttons/NextButton";
import { PlayButton } from "@/Home/components//buttons/PlayButton";
import { PlayListContext } from "@/Home/context/PlayerContextProvider";
import { formatTime } from "@/Home/utils/helpers/playlistHelpers";
import Trackbar from "./Trackbar";

export const SmallPlayer: React.FC = () => {
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
                <BackButton onClick={back}/>
                <PlayButton trackIndex={index} status={playerStatus} />
                <NextButton onClick={next}/>
            </div>
        </div>
    )
}

export default SmallPlayer;
