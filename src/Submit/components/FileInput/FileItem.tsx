import Label from '@/common/components/text/Label';
import { getFormattedFileSize } from '@/Submit/utils/formatting/fileFormatting';
import React from 'react';
import TrashIcon from '../icons/TrashIcon';

interface FileItemProps {
  name: string;
  size: number;
  onRemoveClick: (fileName: string) => void;
}

export const FileItem = ({ name, size, onRemoveClick }: FileItemProps) => {
  return (
    <div className="border-b border-white border-opacity-20 m-2 px-2 flex flex-row justify-between items-end">
      <Label text={`${name} - ${getFormattedFileSize(size)}`} />
      <span className="mt-4">
        <TrashIcon onClick={() => onRemoveClick(name)} />
      </span>
    </div>
  );
};

export default FileItem;
