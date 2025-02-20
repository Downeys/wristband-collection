import { v4 as uuidv4 } from 'uuid';

const getMbsFromBytes = (bytes: number) => {
  const mbs = bytes / 1048576;
  return `${mbs.toFixed(2)} Mbs`;
};

const getKbsFromBytes = (bytes: number) => {
  const mbs = bytes / 1024;
  return `${mbs.toFixed(2)} Kbs`;
};

export const getFormattedFileSize = (bytes: number) => {
  return bytes > 1048576 ? getMbsFromBytes(bytes) : getKbsFromBytes(bytes);
};

export const getFormattedFileName = (fileName: string, fileType: string) => {
  const uniqueId = uuidv4();
  const noSpaces = fileName.replace(/ /g, '-');
  const returnVal = `${fileType}-${noSpaces}-${uniqueId}`;
  return returnVal;
};
