import { ValidFileType } from "../types/submitMusicFormTypes";

export const FieldNames = {
    BAND: "BAND",
    CONTACT: "CONTACT",
    EMAIL: "EMAIL",
    PHONE: "PHONE"
}

export const UNRECOGNIZED_FIELD_MESSAGE = "Something went wrong";

export const FileType: Record<string, ValidFileType> = {
    AUDIO: "audio",
    IMAGE: "image",
    UNKNOWN: "unknown"
}

export default { FieldNames, UNRECOGNIZED_FIELD_MESSAGE, FileType }