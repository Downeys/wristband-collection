import SmallPlayer from "@/components/SmallPlayer/SmallPlayer";
import Track from "@/components/Track/Track";
import { decodePlayerStatusParam } from '@/utils/helpers/SearchParamHelpers'
import PlayListProvider from "@/context/PlayerContext/PlayerContextProvider";
import { getAllTracks } from "@/server/actions/tracks";
import { randomizePlaylist } from "@/utils/helpers/PlaylistHelpers";

export const preloadTracks = (() => {
    void getAllTracks()
})

export default async function HomePage() {
    preloadTracks();
    const tracks = await getAllTracks();
    const randomizedTracks = randomizePlaylist(tracks);
    return (
        <main className="flex min-w-screen min-h-screen flex-col px-6 sm:px-12 pt-4 bg-slate-950 relative top-20 z-0">
            <div>
                {randomizedTracks.map((track, idx) => <Track { ...track } key={`${track.id}`} trackIndex={idx} />)}
                <div className="h-60" />
            </div>
            <div className="fixed bottom-0 left-0">
                <PlayListProvider props={{ playList: randomizedTracks }}>
                    <SmallPlayer />
                </PlayListProvider>
            </div>
        </main>
    );
}