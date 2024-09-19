import SmallPlayer from "@/components/SmallPlayer/SmallPlayer";
import Track from "@/components/Track/Track";
import { decodeOrderParam, decodePlayerStatusParam } from '@/utils/helpers/SearchParamHelpers'
import PlayListProvider from "@/context/PlayerContext/PlayerContextProvider";
import { getAllTracks } from "@/server/actions/tracks";
import { sortPlaylistByOrderList, sortPlaylistByPosition } from "@/utils/helpers/PlaylistHelpers";

interface HomeProps {
    inFocusParam: string;
    playerStatusParam: string;
    orderParam: string;
}

export const preloadTracks = (() => {
    void getAllTracks()
})

export default async function HomePage({ inFocusParam, playerStatusParam, orderParam }: HomeProps) {
    preloadTracks();
    const tracks = await getAllTracks();
    const orderList = decodeOrderParam(orderParam);
    const sortedTracks = orderList.length ? sortPlaylistByOrderList(tracks, orderList) : tracks;
    const { status, index } = decodePlayerStatusParam(playerStatusParam);
    return (
        <main className="flex min-w-screen min-h-screen flex-col px-6 sm:px-12 pt-4 bg-slate-950 relative top-20 z-0">
            <div>
                {sortedTracks.map((track, idx) => <Track { ...track } key={`${track.id}`} trackInFocus={inFocusParam} trackIndex={idx} trackInPlayer={index} playerStatus={status} orderParam={orderParam} />)}
                <div className="h-60" />
            </div>
            <div className="fixed bottom-0 left-0">
                <PlayListProvider props={{ playList: tracks }}>
                    <SmallPlayer />
                </PlayListProvider>
            </div>
        </main>
    );
}