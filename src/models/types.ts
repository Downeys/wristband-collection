import { Document, ObjectId } from "mongoose";

export interface TrackSchema extends Document {
    id: ObjectId;
    trackName: string,
    bandName: string,
    audioSrc: string,
    picSrc: string,
    buyLink: string,
}

export interface TrackData {
    id: string;
    trackName: string,
    bandName: string,
    audioSrc: string,
    picSrc: string,
    buyLink: string,
}