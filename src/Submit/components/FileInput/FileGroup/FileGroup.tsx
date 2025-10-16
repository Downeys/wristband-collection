import React from 'react';
import { Heading } from '../../../../common/components/text/Heading/Heading';
import { FileItem } from '../FileItem/FileItem';
import styles from './FileGroup.module.scss';

interface FileGroupProps {
  groupName: string;
  files: File[];
  onFileRemoved: (fileName: string) => void;
}

export const FileGroup = ({ groupName, files, onFileRemoved }: FileGroupProps) => {
  return (
    files.length && (
      <div className={styles.fileGroupContainer}>
        <Heading text={`${groupName}:`} />
        {files.map((file) => (
          <FileItem key={file.name} name={file.name} size={file.size} onRemoveClick={onFileRemoved} />
        ))}
      </div>
    )
  );
};

export default FileGroup;
