import { getAllTracks } from "@/server/actions/tracks";
import { sortPlaylistByOrderList } from "@/Home/utils/helpers/PlaylistHelpers";
import { decodeOrderParam, decodePlayerStatusParam } from "@/Home/utils/helpers/SearchParamHelpers";
import PlayListProvider from "@/common/context/player/PlayerContextProvider";
import { Label } from "@/common/components/text/Label";
import { Player } from "./components/Player/Player";

interface RadioPageProps {
    inFocusParam: string;
    playerStatusParam: string;
    orderParam: string;
    locale: string;
}

const preloadTracks = (() => {
    void getAllTracks()
})

export default async function RadioPage({ inFocusParam, playerStatusParam, orderParam, locale }: RadioPageProps) {
    preloadTracks();
    const tracks = await getAllTracks();
    const orderList = decodeOrderParam(orderParam);
    const sortedTracks = orderList.length ? sortPlaylistByOrderList(tracks, orderList) : tracks;
    const { status, index } = decodePlayerStatusParam(playerStatusParam);
    return (
        <main className= "fixed top-0 w-full min-w-screen min-h-screen max-h-screen flex flex-col items-center sm:px-12 pt-4 bg-slate-950">
            <PlayListProvider props={{ playList: tracks }}>
                <div className='h-screen w-full flex flex-col justify-end max-w-screen-sm'>
                    <div className='flex flex-col h-full w-full justify-center items-center max-w-screen-sm mb-56 mt-16 border border-dashed rounded-lg'>
                        <Label text='Your ad here' />
                    </div>
                    <div className="absolute bottom-0 w-full max-w-screen-sm z-20 bg-transparent">
                        <Player />
                    </div>
                </div>
            </PlayListProvider>
        </main>
    );
}