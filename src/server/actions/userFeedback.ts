import { UserFeedback } from "@/models/userFeedback";
import { connectToDb } from "@/server/config/mongoRepo";
import { ContactForm } from "@/Contact/types/contactFormTypes";

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