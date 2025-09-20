import { ValidFileType } from '../types/submitMusicFormTypes';

export const FieldNames = {
  BAND: 'BAND',
  CONTACT: 'CONTACT',
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
};

export const FileType: Record<string, ValidFileType> = {
  AUDIO: 'audio',
  IMAGE: 'image',
  VIDEO: 'video',
  UNKNOWN: 'unknown',
};

export const submitFormConstants = { FieldNames, FileType };
export default submitFormConstants;
