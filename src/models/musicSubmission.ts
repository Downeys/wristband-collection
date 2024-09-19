import { Schema, model, models } from 'mongoose'
import { MusicSubmissionSchema } from "@/models/types";
import { AlbumDto, SongDto } from "@/types/submitMusicFormTypes";

const songSchema = new Schema<SongDto>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
})

const albumSchema = new Schema<AlbumDto>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    songs: {
        type: [songSchema],
        required: true
    }
})

const musicSubmissionSchema = new Schema<MusicSubmissionSchema>({
    band: {
        type: String,
        required: true
    },
    contact: {
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
    albums: {
        type: [albumSchema],
        requried: true
    }
})

export const MusicSubmission = models.MusicSubmission || model<MusicSubmissionSchema>('MusicSubmission', musicSubmissionSchema);
