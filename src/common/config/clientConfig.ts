import dotenv from 'dotenv';
import { DEFAULT_MAX_FILES_ACCEPTED, DEFAULT_MAX_FILE_SIZE } from '../constants/configConstants';

dotenv.config();

interface RawEnvVars {
  acceptedImageFiles: string | undefined;
  acceptedAudioFiles: string | undefined;
  acceptedVideoFiles: string | undefined;
  maxAcceptedFiles: string | undefined;
  maxFileSize: string | undefined;
  audioStreamBaseUrl: string | undefined;
}

interface MusicSubmissionProps {
  acceptedImageFiles: string[];
  acceptedAudioFiles: string[];
  acceptedVideoFiles: string[];
  maxAcceptedFiles: number;
  maxFileSize: number;
}

interface AudioStreamProps {
  audioStreamBaseUrl: string;
}

interface Config {
  musicSubmission: MusicSubmissionProps;
  audioStream: AudioStreamProps;
}

const envVars: RawEnvVars = {
  acceptedImageFiles: process.env.NEXT_PUBLIC_ACCEPTED_IMAGE_FILES,
  acceptedAudioFiles: process.env.NEXT_PUBLIC_ACCEPTED_AUDIO_FILES,
  acceptedVideoFiles: process.env.NEXT_PUBLIC_ACCEPTED_VIDEO_FILES,
  maxAcceptedFiles: process.env.NEXT_PUBLIC_MAX_ACCEPTED_FILES,
  maxFileSize: process.env.NEXT_PUBLIC_MAX_FILE_SIZE,
  audioStreamBaseUrl: process.env.NEXT_PUBLIC_AUDIO_STREAM_BASE_URL,
};

const getSanitizedConfig = (c: RawEnvVars): Config => {
  for (const [key, value] of Object.entries(c)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }

  const acceptedImageFiles = c.acceptedImageFiles ? c.acceptedImageFiles.split(',') : [];

  const acceptedAudioFiles = c.acceptedAudioFiles ? c.acceptedAudioFiles.split(',') : [];

  const acceptedVideoFiles = c.acceptedVideoFiles ? c.acceptedVideoFiles.split(',') : [];

  const musicSubmission: MusicSubmissionProps = {
    acceptedImageFiles,
    acceptedAudioFiles,
    acceptedVideoFiles,
    maxAcceptedFiles: c.maxAcceptedFiles ? parseInt(c.maxAcceptedFiles) : DEFAULT_MAX_FILES_ACCEPTED,
    maxFileSize: c.maxFileSize ? parseInt(c.maxFileSize) : DEFAULT_MAX_FILE_SIZE,
  };

  const audioStream: AudioStreamProps = {
    audioStreamBaseUrl: c.audioStreamBaseUrl ?? '',
  };

  return {
    musicSubmission,
    audioStream,
  };
};

export default getSanitizedConfig(envVars);
