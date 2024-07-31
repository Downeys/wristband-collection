import { connectToDb } from "@/config/mongoRepo";
import { MusicSubmission } from "@/models/musicSubmission";
import { SubmitFormDto } from "@/types/SubmitMusicFormTypes";

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
