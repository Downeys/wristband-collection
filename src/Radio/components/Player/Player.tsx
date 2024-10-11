'use client'

import React, { useContext, useMemo } from 'react'
import Label from '@/common/components/text/Label';
import BackButton from '@/common/components/buttons/BackButton';
import NextButton from '@/common/components/buttons/NextButton';
import PlayButton from '@/common/components/buttons/PlayButton';
import { PlayListContext } from '@/common/context/player/PlayerContextProvider';
import Image from 'next/image';
import ThumbsUpIcon from '@/common/components/icons/ThumbsUpIcon';
import { ThumbsUpButton } from '@/common/components/buttons/ThumbsUpButton';
import ThumbsDownButton from '@/common/components/buttons/ThumbsDownButton';
import SkipButton from '@/common/components/buttons/SkipButton';

export const Player = () => {
    const { trackInPlayer, playerStatus, index, back, next } = useContext(PlayListContext);
    const bandName = trackInPlayer?.bandName ?? '';
    const trackMessage = useMemo(() => trackInPlayer?.bandName ? `"${trackInPlayer?.trackName}"` : 'Welcome to Wristband Radio', [trackInPlayer]);

    return (
        <div className="w-full flex flex-col pt-2 px-6 bg-slate-950 bg-opacity-30 footer-sho">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col pl-2">
                    <Label text={bandName} size="xl" bold />
                    <Label text={trackMessage} size="sm" />
                    <Label text="Album Name" size="sm" />
                </div>
                <Image src={trackInPlayer?.picSrc ?? ''} alt="Album Art" height="96" width="96" />
            </div>
            <div className="flex flex-row justify-center items-center h-28 py-4">
                <ThumbsDownButton />
                <PlayButton trackIndex={index} status={playerStatus} />
                <ThumbsUpButton />
                <span className='ml-6 flex items-center'>
                    <SkipButton />
                    <Label text='(6)' size='sm' additionalStyles='ml-2' />
                </span>
            </div>
        </div>
    )
}

export default Player;