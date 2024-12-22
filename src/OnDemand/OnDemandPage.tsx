import { getAllTracks } from "@/server/actions/tracks";
import { sortPlaylistByBand } from "@/Home/utils/helpers/playlistHelpers";
import { decodeOrderParam, decodePlayerStatusParam } from "@/Home/utils/helpers/searchParamHelpers";
import { Track } from "@/OnDemand/components/Track/Track";
import SmallPlayer from "@/common/components/SmallPlayer/SmallPlayer";
import PlayListProvider from "@/common/context/player/PlayerContextProvider";
import { Suspense } from "react";

interface OnDemandProps {
    inFocusParam: string;
    playerStatusParam: string;
    orderParam: string;
    locale: string;
}

const preloadTracks = (() => {
    void getAllTracks()
})

export default async function OnDemandPage({ inFocusParam, playerStatusParam, orderParam, locale }: OnDemandProps) {
    preloadTracks();
    const tracks = await getAllTracks();
    const orderList = decodeOrderParam(orderParam);
    const showTracks = orderList.length > 0;
    const sortedTracks = showTracks ? sortPlaylistByBand(tracks) : tracks;
    const { status, index } = decodePlayerStatusParam(playerStatusParam);
    return (
        <main className="flex min-w-screen min-h-screen flex-col px-6 sm:px-12 pt-4 bg-slate-950 relative top-20 z-0">
            <div>
                {showTracks && sortedTracks.map((track, idx) => <Track { ...track } key={`${track.id}`} trackInFocus={inFocusParam} trackIndex={idx} trackInPlayer={index} playerStatus={status} orderParam={orderParam} locale={locale} />)}
                <div className="h-60" />
            </div>
            <div className="fixed bottom-0 left-0">
                <Suspense>
                    <PlayListProvider props={{ playList: tracks }}>
                        <SmallPlayer play back next />
                    </PlayListProvider>
                </Suspense>
            </div>
        </main>
    );
}
