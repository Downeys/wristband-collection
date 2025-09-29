export interface Song {
  id: string;
  index: number;
  name?: string;
  file?: File;
}

export interface Album {
  id: string;
  index: number;
  songs: Song[];
  name?: string;
  photo?: File;
}

export interface SubmitState {
  formInProgress: SubmitForm | null;
  inProgress: boolean;
  showConfirmationModal: boolean;
  showFailureModal: boolean;
  showForm: boolean;
}

export interface SubmitFormDto {
  band: string;
  contact: string;
  email: string;
  phone: string;
  attestation: boolean;
  imageLinks: string[];
  audioLinks: string[];
}

export interface SubmitForm {
  band: string;
  contact: string;
  email: string;
  phone: string;
  imageFiles: File[];
  audioFiles: File[];
  ownershipAttestation: boolean;
}

export type ValidFileType = 'audio' | 'image' | 'video' | 'unknown';
