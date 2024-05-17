"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import PlayIcon from "../icons/PlayIcon";
import { MouseEventHandler, useCallback, useMemo } from 'react';
import PauseIcon from '../icons/PauseIcon';
import { constructPlayerStatusAction } from '../utils/SearchParamHelpers';
import { PlayerStatus } from '../constants/PlayerStatusEnum';

export interface PlayButtonProps {
    variant?: 'primary' | 'track';
    trackId: string;
    status: PlayerStatus;
    onClick?: (trackId: string, status: 'playing' | 'paused') => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ variant, trackId, status, onClick }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isPlaying = useMemo(() => status === PlayerStatus.playing, [status]);
    const inFocusParam = useMemo(() => searchParams.get('inFocus'), [searchParams]);
    
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault();
        const newStatus = isPlaying ? PlayerStatus.paused : PlayerStatus.playing;
        const newPlayerStatus = constructPlayerStatusAction(newStatus, trackId);
        router.push(`/?playerStatus=${newPlayerStatus}&inFocus=${inFocusParam}`)
    }, [router, isPlaying, trackId]);

    const variantStyle = {
        primary: 'h-20 w-20 mx-12 rounded-full shadow-blue pl-3 pt-3',
        track: 'h-14 w-14 border border-1 rounded-full pl-1 pt-1'
    }
    const iconStyling = {
        primary: 'h-14 w-14',
        track: 'h-7 w-7'
    }
    const styleVariant = variant ?? 'primary';
    const Icon = useMemo(() => isPlaying ? PauseIcon : PlayIcon, [isPlaying]);
    const isPink = styleVariant === 'primary';

    return (
        <button className={`flex flex-col items-center justify-center ${variantStyle[styleVariant]}`} onClick={handleClick}>
            <Icon styling={iconStyling[styleVariant]} selected={isPink} />
        </button>
    )
}

export default PlayButton;