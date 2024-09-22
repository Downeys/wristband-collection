'use client'

import { useContext, useMemo } from "react";
import { Label } from "@/common/components/text/Label";
import { BackButton } from "@/Home/components/buttons/BackButton";
import { NextButton } from "@/Home/components//buttons/NextButton";
import { PlayButton } from "@/Home/components//buttons/PlayButton";
import { PlayListContext } from "@/Home/context/PlayerContextProvider";

export const SmallPlayer: React.FC = () => {
    const { trackInPlayer, playerStatus, index, back, next } = useContext(PlayListContext);
    const trackMessage = useMemo(() => trackInPlayer?.bandName ? `${trackInPlayer?.bandName} - ${trackInPlayer?.trackName}` : 'Welcome to Wristband Radio', [trackInPlayer]);

    return (
        <div className="h-44 w-screen flex flex-col pt-2 px-6 bg-slate-950 shadow-footer">
            <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex flex-row">
                    <Label text={trackMessage} size="lg" bold />
                </div>
            </div>
            <div className="flex flex-row justify-center items-center p-2">
                <BackButton onClick={back}/>
                <PlayButton trackIndex={index} status={playerStatus} />
                <NextButton onClick={next}/>
            </div>
        </div>
    )
}

export default SmallPlayer;
