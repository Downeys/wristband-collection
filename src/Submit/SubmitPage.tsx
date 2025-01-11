'use client'

import FormInput from '@/common/components/formElements/FormInput';
import ConfirmationModal from '@/common/components/modals/ConfirmationModal';
import FailureModal from '@/common/components/modals/FailureModal';
import Heading from '@/common/components/text/Heading';
import Label from '@/common/components/text/Label';
import React, { FormEventHandler, MouseEventHandler, useCallback, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { SubmitState, SubmitForm } from '@/Submit/types/submitMusicFormTypes';
import { createMusicSubmissionFormData, getNextIndex } from '@/Submit/utils/helpers/formHelpers';
import SubmitMusicValidator from '@/Submit/utils/validations/validators/musicFormValidator';
import { FieldNames, UNRECOGNIZED_FIELD_MESSAGE } from '@/Submit/constants/submitFormConstants';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/common/constants/i18nConstants';
import { SUBMIT_URI } from './constants/apiConstants';
import FileInput from './components/FileInput/FileInput';
import LoadingModal from '@/common/components/modals/LoadingModal';
import Attestation from './components/Attestation/Attestation';
import fetchService from '@/common/config/FetchService';

const initState = {
    band: '',
    contact: '',
    email: '',
    phone: '',
    imageFiles: [],
    audioFiles: [],
    ownershipAttestation: false,
    validationMessages: [],
    inProgress: false,
    showConfirmationModal: false,
    showFailureModal: false
}

export default function SubmitPage() {
    const [state, setState] = useState<SubmitState>(initState);
    const { t } = useTranslation(Namespaces.SUBMIT);
    const { BAND, CONTACT, EMAIL, PHONE } = FieldNames;
    const resetState = () => setState(initState);

    const handleSubmit = useCallback(async () => {
        const form: SubmitForm = {
            band: state.band,
            contact: state.contact,
            email: state.email,
            phone: state.phone,
            imageFiles: state.imageFiles,
            audioFiles: state.audioFiles,
            ownershipAttestation: state.ownershipAttestation
        }
        const { isValid, validationMessages } = SubmitMusicValidator.isValid(form);
        if (!isValid) setState({ ...state, validationMessages }); 
        if (isValid) {
            const formData = createMusicSubmissionFormData(form)
            try {
                await fetchService.POST(SUBMIT_URI, formData);
                setState({ ...state, showConfirmationModal: true });
            } catch (e) {
                setState({ ...state, showFailureModal: true });
            }
            
        }
    }, [state])

    const handleSubmitEvent: FormEventHandler<HTMLFormElement> = useCallback((e) => {
        e.preventDefault();
        setState({ ...state, inProgress: true });
        handleSubmit();
    }, [state, handleSubmit]);

    const handleSubmitClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault();
        setState({ ...state, inProgress: true });
        handleSubmit();
    }, [state, handleSubmit]);

    const handleRetry = useCallback(() => {
        setState({ ...state, showFailureModal: false, inProgress: true });
        handleSubmit();
    }, [state, handleSubmit])

    const handleInputChange = useCallback((name: string, text: string) => {
        switch (name) {
            case BAND:
                setState({ ...state, band: text })
                break;
            case CONTACT:
                setState({ ...state, contact: text })
                break;
            case EMAIL:
                setState({ ...state, email: text })
                break;
            case PHONE:
                setState({ ...state, phone: text })
                break;
            default:
                console.log(UNRECOGNIZED_FIELD_MESSAGE)
        }
    }, [state, BAND, CONTACT, EMAIL, PHONE])

    const handleFilesAdded = useCallback((imageFiles: File[], audioFiles: File[]) => {
        const updatedImageFiles = [...state.imageFiles, ...imageFiles];
        const updatedAudioFiles = [...state.audioFiles, ...audioFiles];
        setState({ ...state, imageFiles: updatedImageFiles, audioFiles: updatedAudioFiles});
    }, [state])

    const handleFileRemoved = useCallback((fileName: string) => {
        const updatedImageFiles = state.imageFiles.filter(file => file.name !== fileName);
        const updatedAudioFiles = state.audioFiles.filter(file => file.name !== fileName);
        setState({ ...state, imageFiles: updatedImageFiles, audioFiles: updatedAudioFiles});
    }, [state])

    const handleAttestationChange = useCallback((value: boolean) => {
        setState({ ...state, ownershipAttestation: value })
    }, [state])

    return (
        <main className="flex min-w-screen min-h-screen flex-col items-center px-8 pt-4 bg-slate-950 relative top-20 z-0">
            <LoadingModal showModal={state.inProgress} />
            <ConfirmationModal message={t('confirmationMessage')} onConfirm={resetState} showModal={state.showConfirmationModal} />
            <FailureModal message={t('failureMessage')} showModal={state.showFailureModal} onCancel={resetState} onRetry={handleRetry} />
            <div className="w-full max-w-screen-sm">
                <Heading size="3xl" text={t('submitHeading')} additionalStyles="w-full text-center p-2"/>
                <form onSubmit={handleSubmitEvent} className="my-4">
                    <FormInput name={BAND} label={t('bandLabel')} onChange={handleInputChange} value={state.band} />
                    <FormInput name={CONTACT} label={t('contactLabel')} onChange={handleInputChange} value={state.contact} />
                    <FormInput name={EMAIL} type="email" label={t('emailLabel')} onChange={handleInputChange} value={state.email} />
                    <FormInput name={PHONE} type="tel" label={t('phoneLabel')} onChange={handleInputChange} value={state.phone} />
                    <FileInput imageFiles={state.imageFiles} audioFiles={state.audioFiles} onFilesAdded={handleFilesAdded} onFileRemoved={handleFileRemoved} />
                    <Attestation onChange={handleAttestationChange} checked={state.ownershipAttestation} />
                    <div className="mb-6 flex flex-col">
                        {state.validationMessages.map(message => <Label key={uuidv4()} text={t(message)} color="red" />)}
                    </div>
                    <div className="flex w-full justify-center items-center">
                        <button type="submit" onClick={handleSubmitClick} className="border-2 border-wbPink rounded-2xl py-3 w-1/2 shadow-pink">
                            <Label text={t('submitButton')} bold size="2xl"/>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
