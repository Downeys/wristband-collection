'use client'
 
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { TrackData } from '@/models/types';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { sortPlaylistByOrderList, getRandomizedOrder, getNextIndex } from '@/Home/utils/helpers/playlistHelpers';
import { decodePlayerStatusParam, decodeOrderParam, constructPlayerStatusAction, encodeOrderParam } from '@/Home/utils/helpers/searchParamHelpers';
import { PlayerStatus } from '@/common/types/playerStatusEnum';
import { SearchParams } from '../constants/playerContextConstants';
import { PlayerContextState } from './PlayerContextState';
import { InitialPlayerState } from './InitialPlayerState';
import { Song } from '@/common/utils/audioWrappers/Song';
import HowlerSongImpl from '@/common/utils/audioWrappers/HowlerSongImpl';

interface PlayListProviderProps {
    playList: TrackData[]
}

interface InternalState {
    pIndex: number;
    trackInPlayer: TrackData | null;
    orderParam: string;
    currentSong: Song | null;
}
 
export const PlayListContext = createContext<PlayerContextState>(InitialPlayerState)
 
export default function PlayListProvider({ children, props }: { children: React.ReactNode, props: PlayListProviderProps }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;

    const [playerStatusParam, index, playlist] = useMemo(() => {
        const { status, index } = searchParams.get(PLAYER_STATUS) ? decodePlayerStatusParam(searchParams.get(PLAYER_STATUS)!) : { status: PlayerStatus.paused, index: 0 };
        const orderList = searchParams.get(ORDER) ? decodeOrderParam(searchParams.get(ORDER)!) : [];
        const sortedTrackList = sortPlaylistByOrderList(props.playList, orderList)
        return [status, index, sortedTrackList]
    }, [searchParams, props.playList]);

    const [state, setState] = useState<InternalState>({
        pIndex: 0,
        trackInPlayer: playlist ? playlist[index] : null,
        orderParam: '',
        currentSong: null,
    });

    const [status, setStatus] = useState<PlayerStatus>(PlayerStatus.paused);
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const songUpdater = useCallback((newSong: Song) => {
        setStatus(newSong.status);
        if (progress != newSong.progress) setProgress(newSong.progress);
        if (currentTime != newSong.currentTime) setCurrentTime(newSong.currentTime);
        if (duration != newSong.duration) setDuration(newSong.duration);
    }, [progress, currentTime, duration, status])

    const back = useCallback((status: string, inFocus: string, order: string) => {
        const currentStatus = decodePlayerStatusParam(status);
        const newIndex = currentStatus.index === 0 ? playlist.length - 1 : currentStatus.index - 1;
        const newPlayerStatus = constructPlayerStatusAction(currentStatus.status, newIndex);
        const newFocus = playlist[newIndex]?.id ?? '';
        router.replace(`?${PLAYER_STATUS}=${newPlayerStatus}&${IN_FOCUS}=${newFocus}&${ORDER}=${order}`, { scroll: false })
    }, [state, router, playlist]);

    const goNext = useCallback((newPlayerStatus: string, newInFocus: string, orderParam: string) => {
        router.replace(`?${PLAYER_STATUS}=${newPlayerStatus}&${IN_FOCUS}=${newInFocus}&${ORDER}=${orderParam}`, { scroll: false })
    }, [router]);
    
    const next = useCallback((status: string, inFocus: string, order: string) => {
        const currentStatus = decodePlayerStatusParam(status);
        const newIndex = getNextIndex(currentStatus.index, playlist);
        const newPlayerStatus = constructPlayerStatusAction(currentStatus.status, newIndex);
        goNext(newPlayerStatus, playlist[newIndex]?.id ?? '', order);
    }, [playlist, goNext]);

    const seek = useCallback((time: number) => {
        state.currentSong?.seek(time);
    }, [state.currentSong])

    const handlePlayerStatusUpdate = useCallback(() => {
        if (state.currentSong && status !== PlayerStatus.uninitiated) {
            if (playerStatusParam === PlayerStatus.paused && status == PlayerStatus.playing) state.currentSong.pause();
            if (playerStatusParam === PlayerStatus.playing && status == PlayerStatus.paused) state.currentSong.play();
        } else if (playlist[index]?.audioSrc) {
            const newIndex = getNextIndex(index, playlist);
            const newSong = new HowlerSongImpl(playlist[index]?.audioSrc, songUpdater, () => goNext(`P${newIndex}`, playlist[newIndex]?.id ?? '', state.orderParam));
            if (playerStatusParam === PlayerStatus.playing) newSong.play();
            setState({ ...state, trackInPlayer: playlist[index], currentSong: newSong })
        }
    }, [state, playerStatusParam, index, status, next, songUpdater]);

    const handlePIndexUpdate = useCallback(() => {
        if (status == PlayerStatus.playing) state.currentSong?.unload();
        const newIndex = getNextIndex(index, playlist);
        const newSong = new HowlerSongImpl(playlist[index]?.audioSrc, songUpdater, () => goNext(`P${newIndex}`, playlist[newIndex]?.id ?? '', state.orderParam));
        if (playerStatusParam === PlayerStatus.playing) newSong.play();
        setState({ ...state, pIndex: index, trackInPlayer: playlist[index], currentSong: newSong })
    }, [state, index, playerStatusParam, playlist, status, goNext, songUpdater])

    useEffect(() => {
        const randomTrackOrder = getRandomizedOrder(props.playList)
        const trackOrder = encodeOrderParam(randomTrackOrder);
        const sortedTrackList = sortPlaylistByOrderList(props.playList, randomTrackOrder)
        const initialStatus = constructPlayerStatusAction(status, 0)
        setState({ ...state, orderParam: trackOrder, trackInPlayer: sortedTrackList[0] })
        router.replace(`?${PLAYER_STATUS}=${initialStatus}&${IN_FOCUS}=${sortedTrackList[0].id}&${ORDER}=${trackOrder}`, { scroll: false })
    }, [])

    useEffect(() => {
        if (state.pIndex !== index) handlePIndexUpdate()
        else if (status !== playerStatusParam) handlePlayerStatusUpdate()
    }, [playerStatusParam, index])

    const value: PlayerContextState = useMemo(() => ({
        trackInPlayer: state.trackInPlayer,
        playerStatus: status,
        index,
        progress,
        duration,
        currentTime,
        playlist,
        back,
        next,
        seek
    }), [state.trackInPlayer, status, index, progress, duration, currentTime, playlist, back, next, seek])

    return <PlayListContext.Provider value={value}>{children}</PlayListContext.Provider>
}