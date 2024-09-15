'use client'
 
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { TrackData } from '@/models/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { Howl } from 'howler';
import { InitialPlayerState } from './InitialPlayerState';
import { PlayerContextState } from './PlayerContextState';
import { constructPlayerStatusAction, decodePlayerStatusParam } from '@/utils/helpers/SearchParamHelpers';
import { PlayerStatus } from '@/types/PlayerStatusEnum';
import { createHowl } from '@/utils/helpers/HowlHelpers';

interface PlayListProviderProps {
    playList: TrackData[]
}

interface InternalState {
    playList: TrackData[];
    status: PlayerStatus;
    pIndex: number;
    trackInPlayer: TrackData | null;
    currentHowl: Howl;
}
 
export const PlayListContext = createContext<PlayerContextState>(InitialPlayerState)
 
export default function PlayListProvider({ children, props }: { children: React.ReactNode, props: PlayListProviderProps }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [inFocus, playerStatus, index] = useMemo(() => {
        const focus = searchParams.get('inFocus');
        const { status, index } = searchParams.get('playerStatus') ? decodePlayerStatusParam(searchParams.get('playerStatus')!) : { status: PlayerStatus.paused, index: 0 };
        return [focus, status, index ]
    }, [searchParams]);

    const [state, setState] = useState<InternalState>({
        playList: props.playList ?? [],
        status: PlayerStatus.paused,
        pIndex: 0,
        trackInPlayer: props.playList ? props.playList[0] : null,
        currentHowl: { state: () => 'unloaded' } as Howl,
    });

    const back = useCallback(() => {
        const newIndex = state.pIndex === 0 ? state.playList.length - 1 : state.pIndex - 1;
        const newPlayerStatus = constructPlayerStatusAction(playerStatus, newIndex);
        router.replace(`?playerStatus=${newPlayerStatus}&inFocus=${inFocus}`, { scroll: false })
    }, [state, playerStatus, inFocus, router]);
    
    const next = useCallback(() => {
        const newIndex = state.pIndex + 1 === state.playList.length ? 0 : state.pIndex + 1;
        const newPlayerStatus = constructPlayerStatusAction(playerStatus, newIndex);
        router.replace(`?playerStatus=${newPlayerStatus}&inFocus=${inFocus}`, { scroll: false })
    }, [state, playerStatus, inFocus, router]);

    const handlePlayerStatusUpdate = useCallback(() => {
        if (state.currentHowl.state() !== 'unloaded') {
            if (playerStatus === PlayerStatus.paused && state.currentHowl.playing()) state.currentHowl.pause();
            if (playerStatus === PlayerStatus.playing && !state.currentHowl.playing()) state.currentHowl.play();
            setState({ ...state, status: playerStatus })
        }
    }, [state, playerStatus, index, next]);

    const handlePIndexUpdate = useCallback(() => {
        if (state.currentHowl.state() !== 'unloaded' && state.currentHowl.playing()) state.currentHowl.stop();
        let newHowl = createHowl(state.playList[index].audioSrc, next);
        if (playerStatus === PlayerStatus.playing) newHowl.play();
        setState({ ...state, pIndex: index, trackInPlayer: state.playList[index], currentHowl: newHowl, status: playerStatus })
    }, [state, index, playerStatus, next])

    useEffect(() => {
        const initialStatus = constructPlayerStatusAction(state.status, 0)
        setState({ ...state, currentHowl: createHowl(state.playList[0].audioSrc, next) })
        router.replace(`?playerStatus=${initialStatus}&inFocus=${state.trackInPlayer?.id}`, { scroll: false })
    }, [])

    useEffect(() => {
        if (state.pIndex !== index) handlePIndexUpdate()
        else if (state.status !== playerStatus) handlePlayerStatusUpdate()
    }, [playerStatus, index])

    const value: PlayerContextState = useMemo(() => ({
        trackInPlayer: state.trackInPlayer,
        playerStatus,
        index,
        back,
        next,
    }), [state.trackInPlayer, playerStatus, index, back, next])

    return <PlayListContext.Provider value={value}>{children}</PlayListContext.Provider>
}