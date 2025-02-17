export const FieldNames = {
  NAME: 'NAME',
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  MESSAGE: 'MESSAGE',
} as const;

export const UNRECOGNIZED_FIELD_MESSAGE = 'Something went wrong';

export const contactFormConstants = { FieldNames, UNRECOGNIZED_FIELD_MESSAGE };
export default contactFormConstants;
