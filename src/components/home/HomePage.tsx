import SmallPlayer from "@/components/SmallPlayer/SmallPlayer";
import Track from "@/components/Track/Track";
import { decodePlayerStatusParam } from "@/components/utils/SearchParamHelpers";
import PlayListProvider from "@/context/PlayerContext/PlayerContextProvider";
import { getAllTracks } from "@/server/actions/tracks";

interface HomeProps {
    inFocusParam: string;
    playerStatusParam: string;
}

export const preloadTracks = (() => {
    void getAllTracks()
})

export default async function HomePage({ inFocusParam, playerStatusParam }: HomeProps) {
    const tracks = await getAllTracks();
    const [status, trackId] = decodePlayerStatusParam(playerStatusParam);
    console.log(`tracks: ${tracks}`)
    return (
        <main className="flex min-w-screen min-h-screen flex-col p-12 dark:bg-slate-800">
            <div>
                {tracks.map((track, idx) => <Track { ...track } key={`${track.id}`} trackInFocus={inFocusParam} trackInPlayer={trackId} playerStatus={status} />)}
                <div className="h-40" />
            </div>
            <div className="fixed bottom-0 left-0">
                <PlayListProvider props={{ history: [], playList: tracks }}>
                <SmallPlayer />
                </PlayListProvider>
            </div>
        </main>
    );
}