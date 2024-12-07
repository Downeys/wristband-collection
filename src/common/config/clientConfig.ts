import dotenv from 'dotenv';
import { DEFAULT_MAX_FILES_ACCEPTED } from '../constants/configConstants';

dotenv.config();

interface RawEnvVars {
    acceptedImageFiles: string | undefined;
    acceptedAudioFiles: string | undefined;
    maxAcceptedFiles: string | undefined;
    audioStreamBaseUrl: string | undefined;
}

interface MusicSubmissionProps {
    acceptedImageFiles: string[];
    acceptedAudioFiles: string[];
    maxAcceptedFiles: number;
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
    maxAcceptedFiles: process.env.NEXT_PUBLIC_MAX_ACCEPTED_FILES,
    audioStreamBaseUrl: process.env.NEXT_PUBLIC_AUDIO_STREAM_BASE_URL
}

const getSanatizedConfig = (c: RawEnvVars): Config => {
    for (const [key, value] of Object.entries(c)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }

    const acceptedImageFiles = c.acceptedImageFiles
        ? c.acceptedImageFiles.split(',')
        : [];
    
    const acceptedAudioFiles = c.acceptedAudioFiles
        ? c.acceptedAudioFiles.split(',')
        : [];

    const musicSubmission: MusicSubmissionProps = {
        acceptedImageFiles,
        acceptedAudioFiles,
        maxAcceptedFiles: c.maxAcceptedFiles ? parseInt(c.maxAcceptedFiles) : DEFAULT_MAX_FILES_ACCEPTED
    }

    const audioStream: AudioStreamProps = {
        audioStreamBaseUrl: c.audioStreamBaseUrl ?? ''
    }

    return {
        musicSubmission,
        audioStream
    }
}

export default getSanatizedConfig(envVars);
