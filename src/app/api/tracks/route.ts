import { getAllTracks } from "@/server/actions/tracks";

export const GET = async () => {
    try {
        const tracks = getAllTracks();
        return Response.json({ tracks })
    } catch (e: any) {
        console.log(e.message)
        return new Response('Failed to retrieve tracks.', { status: 500 })
    };
}
