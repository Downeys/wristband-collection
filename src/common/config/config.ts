import dotenv from 'dotenv';

dotenv.config();

interface RawEnvVars {
    uri: string | undefined;
    blobConnectionString: string | undefined;
    photoSubmissionContainer: string | undefined;
    musicSubmissionContainer: string | undefined;
    photoSubmissionUrl: string | undefined;
    musicSubmissionUrl: string | undefined;
    baseUrl: string | undefined;
    contactLink: string | undefined;
    submitLink: string | undefined;
    aboutLink: string | undefined;
    onDemandLink: string | undefined;
    picOfMeLink: string | undefined;
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

interface LinkProps {
    baseUrl: string;
    contactLink: string;
    submitLink: string;
    aboutLink: string;
    onDemandLink: string;
    picOfMeLink: string;
}

interface Config {
    mongoDb: DbProps;
    blob: BlobProps;
    links: LinkProps;
}

const envVars: RawEnvVars = {
    uri: process.env.DB_URI,
    blobConnectionString: process.env.BLOB_CONNECTION_STRING,
    photoSubmissionContainer: process.env.PHOTO_SUBMISSION_CONTAINER,
    musicSubmissionContainer: process.env.MUSIC_SUBMISSION_CONTAINER,
    photoSubmissionUrl: process.env.PHOTO_SUBMISSION_URL,
    musicSubmissionUrl: process.env.MUSIC_SUBMISSION_URL,
    baseUrl: process.env.BASE_URL,
    contactLink: process.env.CONTACT_URI,
    submitLink: process.env.SUBMIT_URI,
    aboutLink: process.env.ABOUT_URI,
    onDemandLink: process.env.ON_DEMAND_URI,
    picOfMeLink: process.env.PIC_OF_ME_LINK
}

const getSanatizedConfig = (c: RawEnvVars): Config => {
    for (const [key, value] of Object.entries(c)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    const mongoDb: DbProps = {
        uri: c.uri ?? '',
    }

    const blob: BlobProps = {
        connectionString: c.blobConnectionString ?? '',
        photoSubmissionContainer: c.photoSubmissionContainer ?? '',   
        musicSubmissionContainer: c.musicSubmissionContainer ?? '',
        photoSubmissionUrl: c.photoSubmissionUrl ?? '',
        musicSubmissionUrl: c.musicSubmissionUrl ?? ''
    }

    const links: LinkProps = {
        baseUrl: c.baseUrl ?? '',
        contactLink: c.contactLink ?? '',
        submitLink: c.submitLink ?? '',
        aboutLink: c.aboutLink ?? '',
        onDemandLink: c.onDemandLink ?? '',
        picOfMeLink: c.picOfMeLink ?? ''
    }

    return {
        mongoDb,
        blob,
        links
    }
}

export default getSanatizedConfig(envVars);
