import { getAllTracks } from "@/server/actions/tracks";
import { sortPlaylistByOrderList } from "@/Home/utils/helpers/PlaylistHelpers";
import { decodeOrderParam, decodePlayerStatusParam } from "@/Home/utils/helpers/SearchParamHelpers";
import { Track } from "@/Home/components/Track/Track";
import SmallPlayer from "@/Home/components/SmallPlayer/SmallPlayer";
import PlayListProvider from "@/Home/context/PlayerContextProvider";

interface HomeProps {
    inFocusParam: string;
    playerStatusParam: string;
    orderParam: string;
    locale: string;
}

const preloadTracks = (() => {
    void getAllTracks()
})

export default async function HomePage({ inFocusParam, playerStatusParam, orderParam, locale }: HomeProps) {
    preloadTracks();
    const tracks = await getAllTracks();
    const orderList = decodeOrderParam(orderParam);
    const sortedTracks = orderList.length ? sortPlaylistByOrderList(tracks, orderList) : tracks;
    const { status, index } = decodePlayerStatusParam(playerStatusParam);
    return (
        <main className="flex min-w-screen min-h-screen flex-col px-6 sm:px-12 pt-4 bg-slate-950 relative top-20 z-0">
            <div>
                {sortedTracks.map((track, idx) => <Track { ...track } key={`${track.id}`} trackInFocus={inFocusParam} trackIndex={idx} trackInPlayer={index} playerStatus={status} orderParam={orderParam} locale={locale} />)}
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