import dotenv from 'dotenv';

dotenv.config();

interface RawEnvVars {
    uri: string | undefined;
    blobConnectionString: string | undefined;
    photoSubmissionContainer: string | undefined;
    musicSubmissionContainer: string | undefined;
    photoSubmissionUrl: string | undefined;
    musicSubmissionUrl: string | undefined;
}

interface DbProps {
    uri: string;
}

interface BlobProps {
    connectionString: string;
    photoSubmissionContainer: string;
    musicSubmissionContainer: string;
    photoSubmissionUrl: string;
    musicSubmissionUrl: string;
}

interface Config {
    mongoDb: DbProps;
    blob: BlobProps
}

const envVars: RawEnvVars = {
    uri: process.env.DB_URI,
    blobConnectionString: process.env.BLOB_CONNECTION_STRING,
    photoSubmissionContainer: process.env.PHOTO_SUBMISSION_CONTAINER,
    musicSubmissionContainer: process.env.MUSIC_SUBMISSION_CONTAINER,
    photoSubmissionUrl: process.env.PHOTO_SUBMISSION_URL,
    musicSubmissionUrl: process.env.MUSIC_SUBMISSION_URL
}

const getSanatizedConfig = (c: RawEnvVars): Config => {
    for (const [key, value] of Object.entries(c)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    const MONGO: DbProps = {
        uri: c.uri ?? '',
    }

    const BLOB: BlobProps = {
        connectionString: c.blobConnectionString ?? '',
        photoSubmissionContainer: c.photoSubmissionContainer ?? '',   
        musicSubmissionContainer: c.musicSubmissionContainer ?? '',
        photoSubmissionUrl: c.photoSubmissionUrl ?? '',
        musicSubmissionUrl: c.musicSubmissionUrl ?? ''
    }
    return {
        mongoDb: MONGO,
        blob: BLOB
    }
}

export default getSanatizedConfig(envVars);
