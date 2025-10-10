'use-client';

import React, { useCallback, useMemo, useState } from 'react';
import { Label } from '../../../common/components/text/Label';
import { getFileType } from '../../utils/helpers/formHelpers';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FileGroup } from './FileGroup/FileGroup';
import { MusicIcon } from '../icons/MusicIcon';
import { ConfirmationModal } from '../../../common/components/modals/ConfirmationModal';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '../../../common/constants/i18nConstants';
import { FileType } from '../../constants/submitFormConstants';
import config from '../../../common/config/clientConfig';
import styles from './FileInput.module.scss';

interface FileInputProps {
  imageFiles: File[];
  audioFiles: File[];
  onFilesAdded: (imageFiles: File[], audioFiles: File[]) => void;
  onFileRemoved: (fileName: string) => void;
}

export const FileInput = ({ imageFiles, audioFiles, onFilesAdded, onFileRemoved }: FileInputProps) => {
  const { t } = useTranslation(Namespaces.SUBMIT);
  const { acceptedImageFiles, acceptedAudioFiles, acceptedVideoFiles, maxAcceptedFiles, maxFileSize } = config.musicSubmission;
  const [showModal, setShowModal] = useState(false);
  const [message1, message2, showImageFiles, showAudioFiles] = useMemo(() => {
    if (imageFiles.length || audioFiles.length) {
      const m1 = t('secondaryFileInputMessage1');
      const m2 = t('secondaryFileInputMessage2');
      if (imageFiles.length && audioFiles.length) return [m1, m2, true, true];
      if (imageFiles.length) return [m1, m2, true, false];
      return [m1, m2, false, true];
    }
    return [t('initialFileInputMessage1'), t('initialFileInputMessage2'), false, false];
  }, [imageFiles, audioFiles, t]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // need to handle rejected files here
      const totalFiles = acceptedFiles.length + imageFiles.length + audioFiles.length;
      if (totalFiles > 20 || fileRejections.length > 20) {
        setShowModal(true);
        return;
      }
      const updatedImageFiles: File[] = [];
      const updatedAudioFiles: File[] = [];
      acceptedFiles.forEach((file: File) => {
        const isDuplicate = !(imageFiles.filter((existingImageFile) => existingImageFile.name === file.name).length === 0 && audioFiles.filter((existingAudioFile) => existingAudioFile.name === file.name).length === 0);
        if (!isDuplicate) {
          const type = getFileType(file);
          if (type == FileType.AUDIO) updatedAudioFiles.push(file);
          else if (type == FileType.VIDEO) updatedAudioFiles.push(file);
          else if (type == FileType.IMAGE) updatedImageFiles.push(file);
        }
      });
      onFilesAdded(updatedImageFiles, updatedAudioFiles);
    },
    [imageFiles, audioFiles, onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [...acceptedImageFiles],
      'audio/*': [...acceptedAudioFiles],
      'video/*': [...acceptedVideoFiles],
    },
    maxFiles: maxAcceptedFiles,
    maxSize: maxFileSize,
  });

  return (
    <>
      <ConfirmationModal message={'File capacity exceeded. Please only upload 20 items or less at a time. Thank you!'} onConfirm={() => setShowModal(false)} showModal={showModal} />
      <div className={styles.fileInputContainer}>
        <div className={styles.innerInputContainer} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <MusicIcon />
          ) : (
            <div>
              <Label text={message1} alignment="center" bold size="xl" />
              <Label text={message2} alignment="center" />
              <Label text={t('acceptedFilesMessage')} alignment="center" />
            </div>
          )}
        </div>
      </div>
      {showImageFiles && <FileGroup groupName={t('albumArt')} files={imageFiles} onFileRemoved={onFileRemoved} />}
      {showAudioFiles && <FileGroup groupName={t('audioFiles')} files={audioFiles} onFileRemoved={onFileRemoved} />}
    </>
  );
};

export default FileInput;
