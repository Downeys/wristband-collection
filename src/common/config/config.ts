import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import dotenv from 'dotenv';

dotenv.config();

interface RawSecrets {
  BLOB_CONNECTION_STRING: string | undefined;
  PHOTO_SUBMISSION_CONTAINER: string | undefined;
  MUSIC_SUBMISSION_CONTAINER: string | undefined;
  MP3_CONTAINER: string | undefined;
  WEBM_CONTAINER: string | undefined;
  PHOTO_SUBMISSION_URL: string | undefined;
  MUSIC_SUBMISSION_URL: string | undefined;
  MONGO_DB_URI: string | undefined;
}

interface RawEnvVars {
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
  baseUrl: process.env.BASE_URL,
  contactLink: process.env.CONTACT_URI,
  submitLink: process.env.SUBMIT_URI,
  aboutLink: process.env.ABOUT_URI,
  onDemandLink: process.env.ON_DEMAND_URI,
  picOfMeLink: process.env.PIC_OF_ME_LINK,
};

const guardAgainstMissingConfiguration = (configObject: object) => {
  for (const [key, value] of Object.entries(configObject)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
};

const getEnvConfig = (c: RawEnvVars): LinkProps => {
  guardAgainstMissingConfiguration(c);
  return {
    baseUrl: c.baseUrl!,
    contactLink: c.contactLink!,
    submitLink: c.submitLink!,
    aboutLink: c.aboutLink!,
    onDemandLink: c.onDemandLink!,
    picOfMeLink: c.picOfMeLink!,
  };
};

const getSecrets = async (): Promise<RawSecrets> => {
  const credential = new DefaultAzureCredential();

  const vaultName = process.env.KEY_VAULT_NAME;
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new SecretClient(url, credential);

  const secrets: Record<string, string | undefined> = {};

  for await (let secretProperties of client.listPropertiesOfSecrets()) {
    const secret = await client.getSecret(secretProperties.name);
    if (!secret.value) throw new Error(`Missing value for ${secretProperties.name} in config.env`);
    secrets[secret.name.replaceAll('-', '_')] = secret.value;
  }
  return secrets as unknown as RawSecrets;
};

const getSanatizedConfig = async (c: RawEnvVars): Promise<Config> => {
  const secrets = await getSecrets();
  guardAgainstMissingConfiguration(secrets);

  const mongoDb: DbProps = {
    uri: secrets.MONGO_DB_URI!,
  };

  const blob: BlobProps = {
    connectionString: secrets.BLOB_CONNECTION_STRING!,
    photoSubmissionContainer: secrets.PHOTO_SUBMISSION_CONTAINER!,
    musicSubmissionContainer: secrets.MUSIC_SUBMISSION_CONTAINER!,
    photoSubmissionUrl: secrets.PHOTO_SUBMISSION_URL!,
    musicSubmissionUrl: secrets.MUSIC_SUBMISSION_URL!,
  };

  const links = getEnvConfig(c);

  return {
    mongoDb,
    blob,
    links,
  };
};

export const links = getEnvConfig(envVars);
export default getSanatizedConfig(envVars);
