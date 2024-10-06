import { insertMusicSubmission } from "@/server/actions/musicSubmissions";
import { uploadAlbumPhoto, uploadSongFile } from "@/server/services/BlobService";
import { NextResponse } from "next/server";
import { SUCCESS_MESSAGE, SUBMIT_FAILURE } from "@/common/constants/backend/responseMessages";

export const POST = async (request: Request) => {
    try {
        const data = await request.formData();
        const band = `${data.get('band')}`;
        const contact = `${data.get('contact')}`;
        const email = `${data.get('email')}`;
        const phone = `${data.get('phone')}`;
        const attestation = `${data.get('attestation')}` == 'true';
        const [imageLinks, audioLinks] = await storeFilesInBlob(data);
        await insertMusicSubmission({ band, contact, email, phone, attestation, imageLinks, audioLinks });

        return NextResponse.json({
            message: SUCCESS_MESSAGE,
        });
    } catch (e: any) {
        console.log(e.message)
        return NextResponse.json({
            message: SUBMIT_FAILURE,
            status: 500
         })
    };
}

const storePhotos = async (photos: any[]): Promise<string[]> => {
    let photoLinks: string[] = [];
    for (let i = 0; i < photos.length; i++) {
        const albumId: string = photos[i].photoId;
        const photoLink: string = await uploadAlbumPhoto(photos[i].photo, albumId);
        photoLinks.push(photoLink);
    }
    return photoLinks;
}

const storeSongs = async (songs: any[]): Promise<string[]> => {
    let songLinks: string[] = [];
    for (let i = 0; i < songs.length; i++) {
        const songId: string = songs[i].songId;
        const songLink: string = await uploadSongFile(songs[i].file, songId);
        songLinks.push(songLink);
    }
    return songLinks;
}

const storeFilesInBlob = async (data: FormData) => {
    const albumPhotos: any[] = [];
    const songFiles: any[] = [];
    for(let [name, value] of data) {
        const type = name.split('-')?.[0] ?? 'unknown';
        if (type === 'image') albumPhotos.push({ photoId: name, photo: value })
        if (type === 'audio') songFiles.push({ songId: name, file: value })
    }

    let imageLinks = await storePhotos(albumPhotos);
    let audioLinks = await storeSongs(songFiles)

    return [imageLinks, audioLinks];
}
