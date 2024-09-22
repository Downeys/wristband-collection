import { MusicSubmission } from "@/models/musicSubmission";
import { SubmitFormDto } from "@/Submit/types/submitMusicFormTypes";
import { connectToDb } from "@/server/config/mongoRepo";

export const insertMusicSubmission = async (form: SubmitFormDto): Promise<number> => {
    try {
        await connectToDb();
        const returnVal = MusicSubmission.create(form);
        return 1;
    } catch (e: any) {
        console.log(e.message)
        return 0;
    };
}
