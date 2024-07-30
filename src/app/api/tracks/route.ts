import { getAllTracks } from "@/server/actions/tracks";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const tracks = getAllTracks();
        return NextResponse.json({ data: tracks })
    } catch (e: any) {
        console.log(e.message)
        return NextResponse.json({
          message: 'Failed to retrieve tracks.',
          status: 500
       })
    };
}