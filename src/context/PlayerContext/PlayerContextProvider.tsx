'use client'
 
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { TrackData } from '@/models/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { Howl } from 'howler';
import { InitialPlayerState } from './InitialPlayerState';
import { PlayerContextState } from './PlayerContextState';
import { constructPlayerStatusAction, decodeOrderParam, decodePlayerStatusParam, encodeOrderParam } from '@/utils/helpers/SearchParamHelpers';
import { PlayerStatus } from '@/types/playerStatusEnum';
import { createHowl } from '@/utils/helpers/HowlHelpers';
import { getNextIndex, getRandomizedOrder, sortPlaylistByOrderList } from '@/utils/helpers/PlaylistHelpers';

interface PlayListProviderProps {
    playList: TrackData[]
}

interface InternalState {
    status: PlayerStatus;
    pIndex: number;
    trackInPlayer: TrackData | null;
    orderParam: string;
    currentHowl: Howl;
}
 
export const PlayListContext = createContext<PlayerContextState>(InitialPlayerState)
 
export default function PlayListProvider({ children, props }: { children: React.ReactNode, props: PlayListProviderProps }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [inFocus, playerStatus, index, playlist] = useMemo(() => {
        const focus = searchParams.get('inFocus');
        const { status, index } = searchParams.get('playerStatus') ? decodePlayerStatusParam(searchParams.get('playerStatus')!) : { status: PlayerStatus.paused, index: 0 };
        const orderList = searchParams.get('order') ? decodeOrderParam(searchParams.get('order')!) : [];
        const sortedTrackList = sortPlaylistByOrderList(props.playList, orderList)
        return [focus, status, index, sortedTrackList]
    }, [searchParams, props.playList]);

    const [state, setState] = useState<InternalState>({
        status: PlayerStatus.paused,
        pIndex: 0,
        trackInPlayer: props.playList ? props.playList[0] : null,
        orderParam: '',
        currentHowl: { state: () => 'unloaded' } as Howl,
    });

    const back = useCallback(() => {
        const newIndex = state.pIndex === 0 ? playlist.length - 1 : state.pIndex - 1;
        const newPlayerStatus = constructPlayerStatusAction(playerStatus, newIndex);
        router.replace(`?playerStatus=${newPlayerStatus}&inFocus=${inFocus}&order=${state.orderParam}`, { scroll: false })
    }, [state, playerStatus, inFocus, router, playlist]);

    const goNext = useCallback((newPlayerStatus: string, newInFocus: string, orderParam: string) => {
        router.replace(`?playerStatus=${newPlayerStatus}&inFocus=${newInFocus}&order=${orderParam}`, { scroll: false })
    }, [router]);
    
    const next = useCallback(() => {
        const newIndex = getNextIndex(state.pIndex, playlist);
        const newPlayerStatus = constructPlayerStatusAction(playerStatus, newIndex);
        router.replace(`?playerStatus=${newPlayerStatus}&inFocus=${inFocus}&order=${state.orderParam}`, { scroll: false })
    }, [state, playerStatus, inFocus, router, playlist]);

    const handlePlayerStatusUpdate = useCallback(() => {
        if (state.currentHowl.state() !== 'unloaded') {
            if (playerStatus === PlayerStatus.paused && state.currentHowl.playing()) state.currentHowl.pause();
            if (playerStatus === PlayerStatus.playing && !state.currentHowl.playing()) state.currentHowl.play();
            setState({ ...state, status: playerStatus })
        }
    }, [state, playerStatus, index, next]);

    const handlePIndexUpdate = useCallback(() => {
        if (state.currentHowl.state() !== 'unloaded' && state.currentHowl.playing()) state.currentHowl.stop();
        const newIndex = getNextIndex(index, playlist);
        let newHowl = createHowl(playlist[index].audioSrc, () => goNext(`P${newIndex}`, inFocus ?? '', state.orderParam));
        if (playerStatus === PlayerStatus.playing) newHowl.play();
        setState({ ...state, pIndex: index, trackInPlayer: playlist[index], status: playerStatus, currentHowl: newHowl })
    }, [state, index, playerStatus, playlist, goNext])

    useEffect(() => {
        const randomTrackOrder = getRandomizedOrder(props.playList)
        const trackOrder = encodeOrderParam(randomTrackOrder);
        const sortedTrackList = sortPlaylistByOrderList(props.playList, randomTrackOrder)
        const initialStatus = constructPlayerStatusAction(state.status, 0)
        const newPlayerStatus = 'P1';
        setState({ ...state, currentHowl: createHowl(sortedTrackList[0].audioSrc, () => goNext(newPlayerStatus, inFocus ?? '', trackOrder)), orderParam: trackOrder, trackInPlayer: sortedTrackList[0] })
        router.replace(`?playerStatus=${initialStatus}&inFocus=${sortedTrackList[0].id}&order=${trackOrder}`, { scroll: false })
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