"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import PlayIcon from "@/common/components/icons/PlayIcon";
import { MouseEventHandler, useCallback, useMemo } from 'react';
import PauseIcon from '@/common/components/icons/PauseIcon';
import Spinner from '@/common/components/Spinner/Spinner';
import { PlayerStatus } from '@/common/types/playerStatusEnum';
import { constructPlayerStatusAction } from '@/Home/utils/helpers/searchParamHelpers';
import { SearchParams } from '@/Home/constants/playerContextConstants';

export interface PlayButtonProps {
    variant?: 'primary' | 'track';
    trackIndex: number;
    status: PlayerStatus;
    loading?: boolean;
    onClick?: (trackId: string, status: 'playing' | 'paused') => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ variant, trackIndex, status, loading, onClick }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isPlaying = useMemo(() => status === PlayerStatus.playing, [status]);
    const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;
    const [inFocusParam, orderParam] = useMemo(() => [searchParams.get(IN_FOCUS), searchParams.get(ORDER)], [searchParams]);
    
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault();
        const newStatus = isPlaying ? PlayerStatus.paused : PlayerStatus.playing;
        const newPlayerStatus = constructPlayerStatusAction(newStatus, trackIndex);
        router.replace(`?${PLAYER_STATUS}=${newPlayerStatus}&${IN_FOCUS}=${inFocusParam}&${ORDER}=${orderParam}`, { scroll: false })
    }, [router, isPlaying, inFocusParam, orderParam, trackIndex]);

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

    if (loading) return <Spinner />

    return (
        <button className={`flex flex-col items-center justify-center ${variantStyle[styleVariant]}`} onClick={handleClick}>
            <Icon styling={iconStyling[styleVariant]} selected={isPink} />
        </button>
    )
}

export default PlayButton;