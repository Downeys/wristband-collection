export const FieldNames = {
    NAME: "NAME",
    EMAIL: "EMAIL",
    PHONE: "PHONE",
    MESSAGE: "MESSAGE",
} as const;

export const UNRECOGNIZE_FIELD_MESSAGE = "Something went wrong";

export const contactFormConstants = { FieldNames, UNRECOGNIZE_FIELD_MESSAGE };
export default contactFormConstants;