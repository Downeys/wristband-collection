import { ValidFileType } from '../types/submitMusicFormTypes';

export const FieldNames = {
  BAND: 'band',
  CONTACT: 'contact',
  EMAIL: 'email',
  PHONE: 'phone',
};

export const FileType: Record<string, ValidFileType> = {
  AUDIO: 'audio',
  IMAGE: 'image',
  VIDEO: 'video',
  UNKNOWN: 'unknown',
};

export const submitFormConstants = { FieldNames, FileType };
export default submitFormConstants;
