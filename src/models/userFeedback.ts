import { model, models, Schema } from "mongoose";
import { UserFeedbackSchema } from "@/models/types";

const userFeedbackSchema = new Schema<UserFeedbackSchema>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true
    }
})

export const UserFeedback = models.UserFeedback || model<UserFeedbackSchema>('UserFeedback', userFeedbackSchema);