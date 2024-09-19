import { connectToDb } from "@/config/mongoRepo";
import { ContactForm } from "@/types/contactFormTypes";
import { UserFeedback } from "@/models/userFeedback";

export const insertUserFeedback = async (form: ContactForm): Promise<number> => {
    try {
        await connectToDb();
        const returnVal = UserFeedback.create(form);
        return 1;
    } catch (e: any) {
        console.log(e.message)
        return 0;
    };
}