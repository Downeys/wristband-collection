import { getAllTracks } from '@/server/actions/tracks';
import { getAlphebeticOrder, sortPlaylistByOrderList } from '@/Home/utils/helpers/playlistHelpers';
import { decodePlayerStatusParam } from '@/Home/utils/helpers/searchParamHelpers';
import { Track } from '@/OnDemand/components/Track/Track';
import SmallPlayer from '@/common/components/SmallPlayer/SmallPlayer';
import PlayListProvider from '@/common/context/player/PlayerContextProvider';
import { Suspense } from 'react';

interface OnDemandProps {
  inFocusParam: string;
  playerStatusParam: string;
  orderParam: string;
}

const preloadTracks = () => {
  void getAllTracks();
};

export default async function OnDemandPage({ inFocusParam, playerStatusParam, orderParam }: OnDemandProps) {
  preloadTracks();
  const tracks = await getAllTracks();
  const orderList = getAlphebeticOrder(tracks);
  const showTracks = orderList.length > 0;
  const sortedTracks = showTracks ? sortPlaylistByOrderList(tracks, orderList) : tracks;
  const { status, id } = decodePlayerStatusParam(playerStatusParam);
  return (
    <main className="flex min-w-screen min-h-screen flex-col px-6 sm:px-12 pt-4 bg-slate-950 relative top-20 z-0">
      <div>
        {showTracks && sortedTracks.map((track) => <Track {...track} key={`${track.id}`} trackInFocus={inFocusParam} trackInPlayer={id} playerStatus={status} orderParam={orderParam} />)}
        <div className="h-60" />
      </div>
      <div className="fixed bottom-0 left-0">
        <Suspense>
          <PlayListProvider props={{ playList: tracks, mode: 'alphabetic' }}>
            <SmallPlayer play back next shuffle />
          </PlayListProvider>
        </Suspense>
      </div>
    </main>
  );
}
