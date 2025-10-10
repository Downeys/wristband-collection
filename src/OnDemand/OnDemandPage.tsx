import React, { Suspense } from 'react';
import { getAllTracks } from '../server/actions/tracks';
import { getAlphabeticOrder, sortPlaylistByOrderList } from '../common/utils/helpers/playlistHelpers';
import { decodePlayerStatusParam } from '../common/utils/helpers/searchParamHelpers';
import { Track } from './components/Track/Track';
import { SmallPlayer } from '../common/components/SmallPlayer/SmallPlayer';
import PlayListProvider from '../common/context/player/PlayerContextProvider';
import styles from './OnDemandPage.module.scss';

interface OnDemandProps {
  inFocusParam: string;
  playerStatusParam: string;
  orderParam: string;
}

const preloadTracks = () => {
  void getAllTracks();
};

export default async function OnDemandPage({ inFocusParam, playerStatusParam, orderParam }: Readonly<OnDemandProps>) {
  preloadTracks();
  const tracks = await getAllTracks();
  const orderList = getAlphabeticOrder(tracks);
  const showTracks = orderList.length > 0;
  const sortedTracks = showTracks ? sortPlaylistByOrderList(tracks, orderList) : tracks;
  const { status, id } = decodePlayerStatusParam(playerStatusParam);
  return (
    <main className={styles.mainContainer}>
      <div className={styles.innerPanelContainer}>
        {showTracks && sortedTracks.map((track) => <Track {...track} key={`${track.id}`} trackInFocus={inFocusParam} trackInPlayer={id} playerStatus={status} orderParam={orderParam} />)}
        <div className={styles.emptySpace} />
      </div>
      <div className={styles.playerContainer}>
        <Suspense>
          <PlayListProvider props={{ playList: tracks, mode: 'alphabetic' }}>
            <SmallPlayer play back next shuffle />
          </PlayListProvider>
        </Suspense>
      </div>
    </main>
  );
}
