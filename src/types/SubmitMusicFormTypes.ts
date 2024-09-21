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
    albums: Album[];
    validationMessages: string[];
    inProgress: boolean;
    showConfirmationModal: boolean;
    showFailureModal: boolean;
}

export interface SongDto {
    id: string;
    name: string;
    file: string;
}

export interface AlbumDto {
    id: string;
    name: string;
    photo: string;
    songs: SongDto[];
}

export interface SubmitFormDto {
    band: string;
    contact: string;
    email: string;
    phone: string;
    albums: AlbumDto[];
}

export interface SongInput {
    id: string;
    name: string;
    file: File;
}

export interface AlbumInput {
    id: string;
    name: string;
    photo: File;
    songs: SongInput[];
}

export interface SubmitForm {
    band: string;
    contact: string;
    email: string;
    phone: string;
    albums: AlbumInput[];
}