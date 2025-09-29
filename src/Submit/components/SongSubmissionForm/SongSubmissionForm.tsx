'use client'

import React, { FormEventHandler, MouseEventHandler, useCallback, useState } from 'react'
import { FormInput } from '@/common/components/formElements/FormInput';
import { FileInput } from '../FileInput/FileInput';
import { Attestation } from '../Attestation/Attestation';
import { Label } from '@/common/components/text/Label';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/common/constants/i18nConstants';
import { FieldNames } from '@/Submit/constants/submitFormConstants';
import { SubmitForm } from '../../types/submitMusicFormTypes';
import { v4 as uuidv4 } from 'uuid';
import SubmitMusicValidator from '@/Submit/utils/validations/validators/musicFormValidator';
import FormDropdown from '@/common/components/formElements/FormDropdown';

interface SongSubmissionModalProps {
    onSubmit: (form: SubmitForm) => void;
}

interface SongSubmissionFormState extends SubmitForm {
    validationMessages: string[];
}

const initState = {
  band: '',
  contact: '',
  email: '',
  phone: '',
  imageFiles: [],
  audioFiles: [],
  ownershipAttestation: false,
  validationMessages: [],
};

export const SongSubmissionForm: React.FC<SongSubmissionModalProps> = ({ onSubmit }) => {
    const { t } = useTranslation(Namespaces.SUBMIT);
    const [state, setState] = useState<SongSubmissionFormState>(initState)
    const { BAND, CONTACT, EMAIL, PHONE } = FieldNames;

    const handleSubmit = () => useCallback(() => {
        const form: SubmitForm = {
              band: state.band,
              contact: state.contact,
              email: state.email,
              phone: state.phone,
              imageFiles: state.imageFiles,
              audioFiles: state.audioFiles,
              ownershipAttestation: state.ownershipAttestation,
            };
        const { isValid, validationMessages } = SubmitMusicValidator.isValid(form);
        if (!isValid) setState({ ...state, validationMessages });
        else {
            onSubmit(form);
        }
    }, [onSubmit, state]);

    const handleInputChange = useCallback(
        (name: string, text: string) => {
            setState({ ...state, [name]: text });
        },
        [state]
      );

    const handleSubmitEvent: FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
          e.preventDefault();
          handleSubmit();
        },
        [handleSubmit]
      );
    
    const handleSubmitClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            e.preventDefault();
            handleSubmit();
        },
        [handleSubmit]
    );

    const handleFilesAdded = useCallback(
        (imageFiles: File[], audioFiles: File[]) => {
        const updatedImageFiles = [...state.imageFiles, ...imageFiles];
        const updatedAudioFiles = [...state.audioFiles, ...audioFiles];
        setState({ ...state, imageFiles: updatedImageFiles, audioFiles: updatedAudioFiles });
        },
        [state]
    );
    
    const handleFileRemoved = useCallback(
        (fileName: string) => {
        const updatedImageFiles = state.imageFiles.filter((file) => file.name !== fileName);
        const updatedAudioFiles = state.audioFiles.filter((file) => file.name !== fileName);
        setState({ ...state, imageFiles: updatedImageFiles, audioFiles: updatedAudioFiles });
        },
        [state]
    );
    
    const handleAttestationChange = useCallback(
        (value: boolean) => {
        setState({ ...state, ownershipAttestation: value });
        },
        [state]
    );
    return(
        <form onSubmit={handleSubmitEvent} className="my-4">
            <FormInput name={BAND} label={t('bandLabel')} onChange={handleInputChange} value={state.band} />
            <FormInput name={CONTACT} label={t('contactLabel')} onChange={handleInputChange} value={state.contact} />
            <FormInput name={EMAIL} type="email" label={t('emailLabel')} onChange={handleInputChange} value={state.email} />
            <FormInput name={PHONE} type="tel" label={t('phoneLabel')} onChange={handleInputChange} value={state.phone} />
            <FileInput imageFiles={state.imageFiles} audioFiles={state.audioFiles} onFilesAdded={handleFilesAdded} onFileRemoved={handleFileRemoved} />
            <Attestation onChange={handleAttestationChange} checked={state.ownershipAttestation} />
            <div className="mb-6 flex flex-col">
                {state.validationMessages.map((message) => (
                    <Label key={uuidv4()} text={t(message)} color="red" />
                ))}
            </div>
            <div className="flex w-full justify-center items-center">
                <button type="submit" onClick={handleSubmitClick} className="border-2 border-wbPink rounded-2xl py-3 w-1/2 shadow-pink">
                    <Label text={t('submitButton')} bold size="2xl" />
                </button>
            </div>
        </form>
    )
}

export default SongSubmissionForm;