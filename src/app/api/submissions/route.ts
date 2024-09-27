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
        const albums = await getAlbums(data);

        await insertMusicSubmission({ band, contact, email, phone, albums });

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

const getAlbumId = (key: string): string => key.split('-').slice(1, 6).join('-')
const getSongId = (key: string): string => key.split('-').slice(6, 11).join('-')

const storePhotos = async (photos: any[]): Promise<Record<string, string>> => {
    let photoLinks: Record<string, string> = {};
    for (let i = 0; i < photos.length; i++) {
        const albumId: string = photos[i].albumId;
        const photoLink: string = await uploadAlbumPhoto(photos[i].photo, albumId);
        photoLinks = { ...photoLinks, [albumId]: photoLink }
    }
    return photoLinks;
}

const storeSongs = async (songs: any[]): Promise<Record<string, string>> => {
    let songLinks: Record<string, string> = {};
    for (let i = 0; i < songs.length; i++) {
        const songId: string = songs[i].songId;
        const songLink: string = await uploadSongFile(songs[i].file, songId);
        songLinks = { ...songLinks, [songId]: songLink }
    }
    return songLinks;
}

const storeFilesInBlob = async (data: FormData) => {
    const albumPhotos: any[] = [];
    const songFiles: any[] = [];
    for(let [name, value] of data) {
        if (name.includes('albumPhoto')) albumPhotos.push({ albumId: getAlbumId(name), photo: value })
        if (name.includes('songFile')) songFiles.push({ songId: getSongId(name), file: value })
    }

    let photoLinks = await storePhotos(albumPhotos);
    let songLinks = await storeSongs(songFiles)

    return [photoLinks, songLinks];
}

const getAlbums = async (data: FormData) => {
    const [photoLinks, songLinks] = await storeFilesInBlob(data);

    const albums: any[] = [];
    for(let [name, value] of data) {
        if (name.includes('albumName')) albums.push({ id: getAlbumId(name), name: value, photo: photoLinks[getAlbumId(name)] })
    }

    return albums.map(album => { 
        const s: any[] = [];
        for(let [name, value] of data) {
            if (name.includes(`songName-${album.id}`)) s.push({ id: getSongId(name), name: value, file: songLinks[getSongId(name)] })
        }
        return { ...album, songs: s }
    })
}
