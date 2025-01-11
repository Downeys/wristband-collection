'use client';

import React from 'react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { TrackData } from '@/models/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { sortPlaylistByOrderList, getRandomizedOrder, getNextIndex, getAlphebeticOrder } from '@/Home/utils/helpers/playlistHelpers';
import { decodePlayerStatusParam, decodeOrderParam, constructPlayerStatusAction, encodeOrderParam } from '@/Home/utils/helpers/searchParamHelpers';
import { PlayerStatus } from '@/common/types/playerStatusEnum';
import { PlayerContextState } from './PlayerContextState';
import { InitialPlayerState } from './InitialPlayerState';
import { Song } from '@/common/utils/audioWrappers/Song';
import HowlerSongImpl from '@/common/utils/audioWrappers/HowlerSongImpl';
import { SearchParams } from '@/Home/constants/playerContextConstants';

interface PlayListProviderProps {
  playList: TrackData[];
  mode: 'random' | 'alphabetic';
}

interface InternalState {
  pIndex: number;
  trackInPlayer: TrackData | null;
  orderParam: string;
  currentSong: Song | null;
}

export const PlayListContext = createContext<PlayerContextState>(InitialPlayerState);

export default function PlayListProvider({ children, props }: { children: React.ReactNode; props: PlayListProviderProps }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { PLAYER_STATUS, IN_FOCUS, ORDER } = SearchParams;

  const [playerStatusParam, index, playlist] = useMemo(() => {
    const { status, id } = searchParams.get(PLAYER_STATUS) ? decodePlayerStatusParam(searchParams.get(PLAYER_STATUS)!) : { status: PlayerStatus.paused, id: '' };
    const orderParam = searchParams.get(ORDER);
    const orderList = (orderParam && orderParam !== 'null') ? decodeOrderParam(orderParam) : [];
    const sortedTrackList = sortPlaylistByOrderList(props.playList, orderList);
    const indexedSong = sortedTrackList.filter((track) => track?.id === id)?.[0];
    const index = sortedTrackList.indexOf(indexedSong);
    return [status, index, sortedTrackList];
  }, [searchParams, PLAYER_STATUS, ORDER, props.playList]);

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

  const songUpdater = useCallback(
    (newSong: Song) => {
      setStatus(newSong.status);
      if (progress != newSong.progress) setProgress(newSong.progress);
      if (currentTime != newSong.currentTime) setCurrentTime(newSong.currentTime);
      if (duration != newSong.duration) setDuration(newSong.duration);
    },
    [progress, currentTime, duration]
  );

  const updateParams = useCallback(
    (newPlayerStatus: string, newInFocus: string, orderParam: string) => {
      router.replace(`?${PLAYER_STATUS}=${newPlayerStatus}&${IN_FOCUS}=${newInFocus}&${ORDER}=${orderParam}`, { scroll: false });
    },
    [router, PLAYER_STATUS, IN_FOCUS, ORDER]
  );

  const back = useCallback(() => {
    const newIndex = index === 0 ? playlist.length - 1 : index - 1;
    const newPlayerStatus = constructPlayerStatusAction(status, playlist[newIndex]?.id);
    const newFocus = playlist[newIndex]?.id ?? '';
    updateParams(newPlayerStatus, newFocus, state.orderParam);
  }, [state, playlist, index, status, updateParams]);

  const next = useCallback(() => {
    const newIndex = getNextIndex(index, playlist);
    const newPlayerStatus = constructPlayerStatusAction(status, playlist[newIndex]?.id);
    updateParams(newPlayerStatus, playlist[newIndex]?.id ?? '', state.orderParam);
  }, [state, index, status, playlist, updateParams]);

  const seek = useCallback(
    (time: number) => {
      state.currentSong?.seek(time);
    },
    [state.currentSong]
  );

  const handlePlayerStatusUpdate = useCallback(() => {
    if (state.currentSong && status !== PlayerStatus.uninitiated) {
      if (playerStatusParam === PlayerStatus.paused && status == PlayerStatus.playing) state.currentSong.pause();
      if (playerStatusParam === PlayerStatus.playing && status == PlayerStatus.paused) state.currentSong.play();
    } else if (playlist[index]?.audioSrc) {
      const newIndex = getNextIndex(index, playlist);
      const newStatus = constructPlayerStatusAction(PlayerStatus.playing, playlist[newIndex].id);
      const newSong = new HowlerSongImpl(playlist[index]?.audioSrc, songUpdater, () => updateParams(newStatus, playlist[newIndex]?.id ?? '', state.orderParam));
      if (playerStatusParam === PlayerStatus.playing) newSong.play();
      setState({ ...state, trackInPlayer: playlist[index], currentSong: newSong });
    }
  }, [state, playerStatusParam, index, status, playlist, songUpdater, updateParams]);

  const handlePIndexUpdate = useCallback(() => {
    if (status == PlayerStatus.playing) state.currentSong?.unload();
    const newIndex = getNextIndex(index, playlist);
    const newStatus = constructPlayerStatusAction(PlayerStatus.playing, playlist[newIndex].id);
    const newSong = new HowlerSongImpl(playlist[index]?.audioSrc, songUpdater, () => updateParams(newStatus, playlist[newIndex]?.id ?? '', state.orderParam));
    if (playerStatusParam === PlayerStatus.playing) newSong.play();
    setState({ ...state, pIndex: index, trackInPlayer: playlist[index], currentSong: newSong });
  }, [state, index, playerStatusParam, playlist, status, updateParams, songUpdater]);

  const shuffle = useCallback(
    (random: boolean) => {
      let trackOrder: number[] = random ? getRandomizedOrder(props.playList, state.trackInPlayer?.id) : getAlphebeticOrder(props.playList, state.trackInPlayer?.id);
      const trackOrderParam = encodeOrderParam(trackOrder);
      const sortedTrackList = sortPlaylistByOrderList(props.playList, trackOrder);
      const initialStatus = constructPlayerStatusAction(status, sortedTrackList[0].id);
      setState({ ...state, pIndex: 0, orderParam: trackOrderParam, trackInPlayer: sortedTrackList[0] });
      router.replace(`?${PLAYER_STATUS}=${initialStatus}&${IN_FOCUS}=${sortedTrackList[0].id}&${ORDER}=${trackOrderParam}`, { scroll: false });
    },
    [router, state, status, PLAYER_STATUS, IN_FOCUS, ORDER, props.playList]
  );

  useEffect(() => {
    shuffle(props.mode == 'random');
  }, []);

  useEffect(() => {
    if (state.pIndex !== index) handlePIndexUpdate();
    else if (status !== playerStatusParam) handlePlayerStatusUpdate();
  }, [playerStatusParam, index]);

  const value: PlayerContextState = useMemo(
    () => ({
      trackInPlayer: state.trackInPlayer,
      playerStatus: status,
      index,
      progress,
      duration,
      currentTime,
      playlist,
      back,
      next,
      seek,
      shuffle,
    }),
    [state.trackInPlayer, status, index, progress, duration, currentTime, playlist, back, next, seek, shuffle]
  );

  return <PlayListContext.Provider value={value}>{children}</PlayListContext.Provider>;
}
