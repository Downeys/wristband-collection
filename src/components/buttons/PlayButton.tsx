"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import PlayIcon from "../icons/PlayIcon";
import { MouseEventHandler, useCallback, useMemo } from 'react';
import PauseIcon from '../icons/PauseIcon';
import { PlayerStatus } from '@/types/PlayerStatusEnum';
import { constructPlayerStatusAction, decodePlayerStatusParam } from '@/utils/helpers/SearchParamHelpers';
import Spinner from '../Spinner/Spinner';

export interface PlayButtonProps {
    variant?: 'primary' | 'track';
    trackId: string;
    trackIndex: number;
    loading?: boolean;
    onClick?: (trackId: string, status: 'playing' | 'paused') => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ variant, trackId, trackIndex, loading, onClick }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inFocus, playerStatus, trackInPlayer] = useMemo(() => {
        const focus = searchParams.get('inFocus');
        const { status, index } = searchParams.get('playerStatus') ? decodePlayerStatusParam(searchParams.get('playerStatus')!) : { status: PlayerStatus.paused, index: 0 };
        return [focus, status, index ]
    }, [searchParams]);
    const isPlaying = useMemo(() => playerStatus === PlayerStatus.playing, [playerStatus]);
    const isInFocus = useMemo(() => inFocus === trackId, [inFocus, trackId]);
    const isInPlayer = useMemo(() => trackInPlayer === trackIndex, [trackInPlayer, trackIndex])
    
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault();
        const newStatus = isPlaying ? PlayerStatus.paused : PlayerStatus.playing;
        const newPlayerStatus = constructPlayerStatusAction(newStatus, trackIndex);
        router.replace(`/?playerStatus=${newPlayerStatus}&inFocus=${inFocus}`, { scroll: false })
    }, [router, isPlaying, inFocus, trackIndex]);

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

    if (!isInFocus && !isInPlayer) return null;

    if (loading) return <Spinner />

    return (
        <button className={`flex flex-col items-center justify-center ${variantStyle[styleVariant]}`} onClick={handleClick}>
            <Icon styling={iconStyling[styleVariant]} selected={isPink} />
        </button>
    )
}

export default PlayButton;