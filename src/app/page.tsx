import SmallPlayer from "@/components/SmallPlayer/SmallPlayer";
import Track from "@/components/Track/Track";
import { constructPlayerStatusAction, decodePlayerStatusParam } from "@/components/utils/SearchParamHelpers";
import PlayListProvider from "@/context/PlayerContext/PlayerContextProvider";
import { mockTracks } from "@/mock-data/mockTracks";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const inFocusParam = `${searchParams.inFocus}`;
  const playerStatusParam = `${searchParams.playerStatus}`;
  const [status, trackId] = decodePlayerStatusParam(playerStatusParam);
  return (
    <main className="flex min-w-screen min-h-screen flex-col p-12 dark:bg-slate-800">
      <div>
        {mockTracks.map((track, idx) => <Track { ...track } key={`${track.trackId}`} trackInFocus={inFocusParam} trackInPlayer={trackId} playerStatus={status} />)}
        <div className="h-40" />
      </div>
      <div className="fixed bottom-0 left-0">
        <PlayListProvider props={{ history: [], playList: mockTracks }}>
          <SmallPlayer />
        </PlayListProvider>
      </div>
    </main>
  );
}
