import { getAllTracks } from "@/server/actions/tracks";
import PlayListProvider from "@/Home/context/PlayerContextProvider";
import RadioPage from "@/Radio/RadioPage";

const preloadTracks = (() => {
    void getAllTracks()
})

export default async function HomePage() {
    preloadTracks();
    const tracks = await getAllTracks();
    return (
        <main className="flex min-w-screen min-h-screen flex-col px-6 sm:px-12 bg-slate-950 relative top-20 z-0">
            <PlayListProvider props={{ playList: tracks }}>
                <RadioPage />
            </PlayListProvider>
        </main>
    );
}