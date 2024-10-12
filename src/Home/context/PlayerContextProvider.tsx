'use client'
 
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { TrackData } from '@/models/types';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { Howl } from 'howler';
import { createHowl } from '@/common/utils/helpers/HowlHelpers';
import { sortPlaylistByOrderList, getRandomizedOrder, getNextIndex } from '@/Home/utils/helpers/PlaylistHelpers';
import { decodePlayerStatusParam, decodeOrderParam, constructPlayerStatusAction, encodeOrderParam } from '@/Home/utils/helpers/SearchParamHelpers';
import { PlayerStatus } from '@/Home/types/playerStatusEnum';
import { SearchParams, INITIAL_HOWL_STATE } from '../constants/playerContextConstants';
import { PlayerContextState } from './PlayerContextState';
import { InitialPlayerState } from './InitialPlayerState';

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
    const params = useParams();
    const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;

    const [inFocus, playerStatus, index, playlist] = useMemo(() => {
        const focus = searchParams.get(IN_FOCUS);
        const { status, index } = searchParams.get(PLAYER_STATUS) ? decodePlayerStatusParam(searchParams.get(PLAYER_STATUS)!) : { status: PlayerStatus.paused, index: 0 };
        const orderList = searchParams.get(ORDER) ? decodeOrderParam(searchParams.get(ORDER)!) : [];
        const sortedTrackList = sortPlaylistByOrderList(props.playList, orderList)
        return [focus, status, index, sortedTrackList]
    }, [searchParams, props.playList]);

    const [state, setState] = useState<InternalState>({
        status: PlayerStatus.paused,
        pIndex: 0,
        trackInPlayer: props.playList ? props.playList[0] : null,
        orderParam: '',
        currentHowl: { state: () => INITIAL_HOWL_STATE } as Howl,
    });

    const back = useCallback((status: string, inFocus: string, order: string) => {
        const currentStatus = decodePlayerStatusParam(status);
        const newIndex = currentStatus.index === 0 ? playlist.length - 1 : currentStatus.index - 1;
        const newPlayerStatus = constructPlayerStatusAction(currentStatus.status, newIndex);
        router.replace(`${params.locale}?${PLAYER_STATUS}=${newPlayerStatus}&${IN_FOCUS}=${inFocus}&${ORDER}=${order}`, { scroll: false })
    }, [state, router, playlist]);

    const goNext = useCallback((newPlayerStatus: string, newInFocus: string, orderParam: string) => {
        router.replace(`${params.locale}?${PLAYER_STATUS}=${newPlayerStatus}&${IN_FOCUS}=${newInFocus}&${ORDER}=${orderParam}`, { scroll: false })
    }, [router]);
    
    const next = useCallback((status: string, inFocus: string, order: string) => {
        const currentStatus = decodePlayerStatusParam(status);
        const newIndex = getNextIndex(currentStatus.index, playlist);
        const newPlayerStatus = constructPlayerStatusAction(currentStatus.status, newIndex);
        goNext(newPlayerStatus, inFocus ?? '', order);
    }, [playlist, goNext]);

    const handlePlayerStatusUpdate = useCallback(() => {
        if (state.currentHowl.state() !== INITIAL_HOWL_STATE) {
            if (playerStatus === PlayerStatus.paused && state.currentHowl.playing()) state.currentHowl.pause();
            if (playerStatus === PlayerStatus.playing && !state.currentHowl.playing()) state.currentHowl.play();
            setState({ ...state, status: playerStatus })
        }
    }, [state, playerStatus, index, next]);

    const handlePIndexUpdate = useCallback(() => {
        if (state.currentHowl.state() !== INITIAL_HOWL_STATE && (state.currentHowl.playing() || state.currentHowl.state() == 'loading')) state.currentHowl.unload();
        const newIndex = getNextIndex(index, playlist);
        let newHowl = createHowl(playlist[index]?.audioSrc, () => goNext(`P${newIndex}`, inFocus ?? '', state.orderParam));
        if (playerStatus === PlayerStatus.playing) newHowl.play();
        setState({ ...state, pIndex: index, trackInPlayer: playlist[index], status: playerStatus, currentHowl: newHowl })
    }, [state, index, playerStatus, playlist, goNext])

    useEffect(() => {
        const randomTrackOrder = getRandomizedOrder(props.playList)
        const trackOrder = encodeOrderParam(randomTrackOrder);
        const sortedTrackList = sortPlaylistByOrderList(props.playList, randomTrackOrder)
        const initialStatus = constructPlayerStatusAction(state.status, 0)
        const newPlayerStatus = 'P0';
        setState({ ...state, currentHowl: createHowl(sortedTrackList[0].audioSrc, () => goNext(newPlayerStatus, inFocus ?? '', trackOrder)), orderParam: trackOrder, trackInPlayer: sortedTrackList[0] })
        router.replace(`${params.locale}?${PLAYER_STATUS}=${initialStatus}&${IN_FOCUS}=${sortedTrackList[0].id}&${ORDER}=${trackOrder}`, { scroll: false })
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