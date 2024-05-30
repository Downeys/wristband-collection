import dotenv from 'dotenv';

dotenv.config();

interface RawEnvVars {
    uri: string | undefined;
}

interface DbProps {
    uri: string;
}

interface Config {
    mongoDb: DbProps;
}

const envVars: RawEnvVars = {
    uri: process.env.DB_URI
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
    return {
        mongoDb: MONGO,
    }
}

export default getSanatizedConfig(envVars);
