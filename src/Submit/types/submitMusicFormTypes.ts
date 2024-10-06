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
    band: string;
    contact: string;
    email: string;
    phone: string;
    imageFiles:  File[];
    audioFiles: File[];
    ownershipAttestation: boolean;
    validationMessages: string[];
    inProgress: boolean;
    showConfirmationModal: boolean;
    showFailureModal: boolean;
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

export type ValidFileType = 'audio' | 'image' | 'unknown';
