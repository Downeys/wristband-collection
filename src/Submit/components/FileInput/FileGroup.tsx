import React from 'react';
import { Heading } from '@/common/components/text/Heading';
import { FileItem } from './FileItem';

interface FileGroupProps {
  groupName: string;
  files: File[];
  onFileRemoved: (fileName: string) => void;
}

export const FileGroup = ({ groupName, files, onFileRemoved }: FileGroupProps) => {
  return (
    files.length && (
      <div className="p-2">
        <Heading text={`${groupName}:`} />
        {files.map((file) => (
          <FileItem key={file.name} name={file.name} size={file.size} onRemoveClick={onFileRemoved} />
        ))}
      </div>
    )
  );
};

export default FileGroup;
