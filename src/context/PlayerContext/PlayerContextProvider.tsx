'use client'
 
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { TrackData } from '@/models/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { Howl } from 'howler';
import { InitialPlayerState } from './InitialPlayerState';
import { PlayerContextState } from './PlayerContextState';
import { constructPlayerStatusAction, decodePlayerStatusParam, getPlayerStatusAction } from '@/components/utils/SearchParamHelpers';
import { PlayerStatus } from '@/components/constants/PlayerStatusEnum';
import { createHowl } from '@/components/utils/HowlHelpers';

interface PlayListProviderProps {
    history: TrackData[]
    playList: TrackData[]
}
 
export const PlayListContext = createContext<PlayerContextState>(InitialPlayerState)
 
export default function PlayListProvider({ children, props }: { children: React.ReactNode, props: PlayListProviderProps }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [inFocusParam, playerStatusParam] = useMemo(() => {
        return([searchParams.get('inFocus'), searchParams.get('playerStatus')])
    }, [searchParams]);

    const [playerStatus, trackIdParam] = useMemo(() => decodePlayerStatusParam(playerStatusParam ?? 'none'), [playerStatusParam])

    const [state, setState] = useState({
        history: props.history ?? InitialPlayerState.history,
        playList: props.playList ?? InitialPlayerState.playList,
        currentHowlId: '',
        status: PlayerStatus.paused,
    });

    const [currentHowl, setCurrentHowl] = useState({ stop: () => {} } as Howl)

    const trackInPlayer: TrackData = useMemo(() => {
        const currentTrack = state.history.length > 0
            ? state.history[state.history.length - 1]
            : state.playList[0];
        return currentTrack
    }, [state.history])

    const handlePlayPause = useCallback(async (id: string, action: 'play' | 'pause') => {
        console.log(trackInPlayer.id)
        if (!currentHowl.play) {
            const song = createHowl(trackInPlayer.audioSrc);
            if (action === 'play') song.play();
            setCurrentHowl(song);
            setState({ ...state, currentHowlId: id })
        } else if (state.currentHowlId !== id) {
            const song = createHowl(trackInPlayer.audioSrc);
            currentHowl.stop();
            if (action === 'play') {
                song.play();
                setState({ ...state, currentHowlId: id, status: PlayerStatus.playing })
            } else {
                setState({ ...state, currentHowlId: id, status: PlayerStatus.paused })
            }
            setCurrentHowl(song);
        } else {
            if (action === 'play') {
                currentHowl.play();
                setState({ ...state, status: PlayerStatus.playing });
            }
            else {
                currentHowl.pause();
                setState({ ...state, status: PlayerStatus.paused });
            }
        }
    }, [currentHowl, trackInPlayer, state]);

    const getUpdatedPlayList = useCallback((action: 'next' | 'back', track: TrackData | null = null): TrackData[] => {
        if (action === 'next' && track) {
            const updatedPlayList = state.playList.filter(t => t.id !== track.id);
            return [...updatedPlayList, track];
        }
        if (action === 'back') {
            const lastTrack = state.history[state.history.length - 1];
            const updatedPlayList = state.playList.filter(t => t.id !== lastTrack.id);
            return [lastTrack, ...updatedPlayList];
        }
        return [];
    }, [state]);

    const back = useCallback(() => {
        if (state.history.length > 1) {
            const updatedPlayList = getUpdatedPlayList('back');
            const updatedHistory = state.history.slice(0, state.history.length - 1);
            const nextTrack = updatedHistory[updatedHistory.length -1];
            const newPlayerStatus = constructPlayerStatusAction(playerStatus, nextTrack.id);
            setState({ ...state, playList: updatedPlayList, history: updatedHistory });
            router.push(`?playerStatus=${newPlayerStatus}&inFocus=${inFocusParam}`)
        }
    }, [state, playerStatusParam, inFocusParam, router]);
    
    const next = useCallback(() => {
        debugger
        if (state.playList.length > 0) {
            const nextTrack = state.playList[0];
            const updatedPlayList = getUpdatedPlayList('next', nextTrack);
            const updatedHistory = [...state.history, nextTrack];
            const newPlayerStatus = constructPlayerStatusAction(playerStatus, nextTrack.id);
            setState({ ...state, history: updatedHistory, playList: updatedPlayList });
            router.push(`?playerStatus=${newPlayerStatus}&inFocus=${inFocusParam}`)
        }
    }, [state, playerStatusParam, inFocusParam, router, getUpdatedPlayList]);

    const handlePlayerStatusUpdate = useCallback(() => {
        if (playerStatusParam && playerStatusParam !== 'undefined') {
            const [status, trackId] = decodePlayerStatusParam(playerStatusParam);
            if (trackInPlayer.id !== trackId) {
                const newTrack = state.playList.filter(track => track.id === trackId)?.[0];
                const updatedHistory = [...state.history, newTrack]
                const updatedPlayList = getUpdatedPlayList('next', newTrack);
                setState({ ...state, history: updatedHistory, playList: updatedPlayList })
            } else if (state.status !== status) {
                var playerStatus = playerStatusParam ?? 'P';
                handlePlayPause(trackId, getPlayerStatusAction(playerStatus.slice(0,1)));
            }
        }
    }, [playerStatusParam, trackInPlayer,state, getUpdatedPlayList]);

    useEffect(() => {
        if (playerStatusParam === null || inFocusParam === null) {
            next();
        }
    }, [])

    useEffect(handlePlayerStatusUpdate, [playerStatusParam])

    useEffect(() => {
        if (trackInPlayer) {
            var playerStatus = playerStatusParam ?? 'S';
            handlePlayPause(trackInPlayer.id, getPlayerStatusAction(playerStatus.slice(0,1)));
        }
    }, [trackInPlayer])

    const value: PlayerContextState = useMemo(() => ({
        ...state,
        trackInPlayer,
        back,
        next,
    }), [state, trackInPlayer, back, next])

    return <PlayListContext.Provider value={value}>{children}</PlayListContext.Provider>
}