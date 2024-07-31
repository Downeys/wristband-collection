import { insertUserFeedback } from "@/server/actions/userFeedback";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const data = await request.json();

        await insertUserFeedback(data);

        return NextResponse.json({
            message: "This message has been successfully sent",
        });
    } catch (e: any) {
        console.log(e.message)
        return NextResponse.json({
            message: 'Failed to insert music submission.',
            status: 500
         })
    };
}