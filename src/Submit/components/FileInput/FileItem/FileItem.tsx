import { Label } from '../../../../common/components/text/Label';
import { getFormattedFileSize } from '../../../utils/formatting/fileFormatting';
import React from 'react';
import TrashIcon from '../../icons/TrashIcon';
import styles from './FileItem.module.scss';

interface FileItemProps {
  name: string;
  size: number;
  onRemoveClick: (fileName: string) => void;
}

export const FileItem = ({ name, size, onRemoveClick }: FileItemProps) => {
  return (
    <div className={styles.fileItemContainer}>
      <Label text={`${name} - ${getFormattedFileSize(size)}`} />
      <span className={styles.iconSpan}>
        <TrashIcon onClick={() => onRemoveClick(name)} />
      </span>
    </div>
  );
};

export default FileItem;
