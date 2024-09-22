import { BlobServiceClient } from '@azure/storage-blob';
import { v1 } from "uuid";
import config from "@/common/config/config"
import sharp from 'sharp';

const blobServiceClient = BlobServiceClient.fromConnectionString(config.blob.connectionString);

const optimize = async (input: Buffer): Promise<Buffer> => await sharp(input, { failOn: 'none' })
    .rotate()
    .resize({ width: 60, withoutEnlargement: true })
    .webp()
    .toBuffer();

const getPhotoBuffer = async (file: any) => {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    return optimize(buffer)
}

const getSongBuffer = async (file: any) => {
    const bytes = await file.arrayBuffer()
    return Buffer.from(bytes)
}

export const uploadAlbumPhoto = async (photo: any, id?: string) => {
    const containerClient = blobServiceClient.getContainerClient(config.blob.photoSubmissionContainer);
    const blobId: string = id ?? v1();
    const blockBlobClient = containerClient.getBlockBlobClient(blobId);
    try {
        const buffer = await getPhotoBuffer(photo)
        await blockBlobClient.upload(buffer, buffer.byteLength);
    } catch (e: any) {
        console.log(`Failed to upload album photo. id: ${blobId} error: ${e.message}`)
    }
    return config.blob.photoSubmissionUrl + blobId;
}

export const uploadSongFile = async (song: any, id?: string) => {
    const containerClient = blobServiceClient.getContainerClient(config.blob.musicSubmissionContainer);
    const blobId: string = id ?? v1();
    const blockBlobClient = containerClient.getBlockBlobClient(blobId);
    try {
        const buffer = await getSongBuffer(song)
        await blockBlobClient.upload(buffer, buffer.byteLength);
    } catch (e: any) {
        console.log(`Failed to upload song file. id: ${blobId} error: ${e.message}`)
    }
    return config.blob.musicSubmissionUrl + blobId;
}