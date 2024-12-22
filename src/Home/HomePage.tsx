import { getAllTracks } from "@/server/actions/tracks";
import RadioPage from "@/Radio/RadioPage";
import PlayListProvider from "@/common/context/player/PlayerContextProvider";
import { Suspense } from "react";
import { mockTracks } from "@/common/mockData/mockTrackData";


const preloadTracks = (() => {
    void getAllTracks()
})

export default async function HomePage() {
    // preloadTracks();
    // const tracks = await getAllTracks();
    const tracks = mockTracks;
    return (
        <main className="flex min-w-screen min-h-screen flex-col px-6 sm:px-12 bg-slate-950 relative top-20 z-0">
            <Suspense>
                <PlayListProvider props={{ playList: tracks }}>
                    <RadioPage />
                </PlayListProvider>
            </Suspense>
        </main>
    );
}