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
        const focus = searchParams.get('inFocus');
        const stat = searchParams.get('playerStatus')
        return [focus, stat]
    }, [searchParams]);

    const [playerStatus, trackId] = useMemo(() => {
        if (!playerStatusParam) return [PlayerStatus.uninitiated, null];
        const returnVar = decodePlayerStatusParam(playerStatusParam)
        return returnVar;
    }, [playerStatusParam])

    const [state, setState] = useState({
        history: props.history ?? [],
        playList: props.playList ?? [],
        currentHowlId: 0,
        seek: 0,
        currentTrackId: '',
        status: PlayerStatus.paused,
    });

    const [currentHowl, setCurrentHowl] = useState({ stop: () => {} } as Howl)

    const trackInPlayer: TrackData | null = useMemo(() => {
        if (state.history.length > 0) return state.history[state.history.length - 1]
        return null;
    }, [state.history])

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
            const nextTrack = state.history[state.history.length - 2];
            const newPlayerStatus = constructPlayerStatusAction(playerStatus, nextTrack.id);
            router.push(`?playerStatus=${newPlayerStatus}&inFocus=${inFocusParam}`)
        }
    }, [state, playerStatus, inFocusParam, router]);
    
    const next = useCallback(() => {
        console.log("testing next")
        if (state.playList.length > 0) {
            const nextTrack = state.playList[0];
            const newPlayerStatus = constructPlayerStatusAction(playerStatus, nextTrack.id);
            router.push(`?playerStatus=${newPlayerStatus}&inFocus=${inFocusParam}`)
        }
    }, [state, playerStatus, inFocusParam, router]);

    const handlePlayPause = useCallback((id: string, action: 'play' | 'pause') => {
        console.log(`${action} track ${id}. currentTrackId=${state.currentTrackId}`)
        debugger
        if (trackInPlayer) {
            if (!currentHowl.play) {
                if (action === 'play') {
                    const song = createHowl(trackInPlayer.audioSrc, next);
                    const howlId = song.play();
                    setState({ ...state, currentTrackId: id, currentHowlId: howlId, status: PlayerStatus.playing })
                    setCurrentHowl(song);
                } else {
                    setState({ ...state, currentTrackId: id, status: PlayerStatus.paused })
                }
            } else if (state.currentTrackId !== id) {
                const matchingTracks = state.playList.filter(track => track.id === id);
                if (matchingTracks.length) {
                    const song = createHowl(matchingTracks[0].audioSrc, next);
                    currentHowl.stop();
                    if (action === 'play') {
                        const howlId = song.play();
                        setState({ ...state, currentTrackId: id, status: PlayerStatus.playing, currentHowlId: howlId })
                    } else {
                        setState({ ...state, currentTrackId: id, status: PlayerStatus.paused })
                    }
                    setCurrentHowl(song);
                }
            } else {
                if (action === 'play') {
                    let song = currentHowl ?? createHowl(trackInPlayer.audioSrc, next);
                    // song.seek(state.seek, state.currentHowlId);
                    const howlId = state.currentHowlId ? song.play(state.currentHowlId) : song.play();
                    setState({ ...state, status: PlayerStatus.playing, currentHowlId: howlId });
                    if (!currentHowl) setCurrentHowl(song);
                }
                else {
                    const pausedHowl = currentHowl.pause(state.currentHowlId);
                    const pausedSeek = pausedHowl.seek();
                    setState({ ...state, status: PlayerStatus.paused, seek: pausedSeek });
                }
            }
        }
    }, [currentHowl, trackInPlayer, state, next]);

    const handlePlayerStatusUpdate = useCallback(() => {
        if (trackInPlayer?.id !== trackId) {
            const matchingTracks = state.playList.filter(track => track.id === trackId);
            if (matchingTracks.length > 0) {
                const newTrack = matchingTracks[0];
                const updatedHistory = [...state.history, newTrack]
                const updatedPlayList = getUpdatedPlayList('next', newTrack);
                setState({ ...state, history: updatedHistory, playList: updatedPlayList })
            }
        } else if (state.status !== playerStatus) {
            var newPlayerStatus = playerStatusParam ?? 'S';
            handlePlayPause(trackId, getPlayerStatusAction(newPlayerStatus.slice(0,1)));
        }
    }, [state, playerStatus, playerStatusParam, trackId, trackInPlayer, getUpdatedPlayList, handlePlayPause]);

    useEffect(() => {
        if (playerStatusParam === null || inFocusParam === null) {
            next();
        }
    }, [])

    useEffect(() => {
        handlePlayerStatusUpdate()
    }, [playerStatus, trackId])

    useEffect(() => {
        var status = playerStatusParam ?? 'S';
        if (trackInPlayer) handlePlayPause(trackInPlayer.id, getPlayerStatusAction(status.slice(0,1)));
    }, [trackInPlayer])

    const value: PlayerContextState = useMemo(() => ({
        trackInPlayer,
        playerStatus,
        back,
        next,
    }), [trackInPlayer, playerStatus, back, next])

    return <PlayListContext.Provider value={value}>{children}</PlayListContext.Provider>
}