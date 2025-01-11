import { Document, ObjectId } from 'mongoose';

export interface TrackSchema extends Document {
  id: ObjectId;
  trackName: string;
  bandName: string;
  audioSrc: string;
  picSrc: string;
  buyLink: string;
  position: number;
}

export interface MusicSubmissionSchema extends Document {
  id: ObjectId;
  band: string;
  contact: string;
  email: string;
  phone: string;
  attestation: boolean;
  imageLinks: string[];
  audioLinks: string[];
}

export interface UserFeedbackSchema extends Document {
  id: ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface TrackData {
  id: string;
  trackName: string;
  bandName: string;
  audioSrc: string;
  picSrc: string;
  buyLink: string;
  position: number;
}
