'use-client'

import { PropsWithChildren, useCallback } from "react";
import { FileInput } from "@/Submit/components/formElements/FileInput";
import FormInput from "@/common/components/formElements/FormInput";
import { FieldNames } from "@/Submit/constants/submitFormConstants";
import { useTranslation } from 'react-i18next';
import { Namespaces } from "@/common/constants/i18nConstants";

interface AlbumInputProps {
    id: string;
    index: number;
    value: string;
    onNameChange: (name: string, text: string, id?: string) => void;
    onPhotoChange: (song: File, id: string) => void;
}

const shadows = ["shadow-green","shadow-blue"]
const borders = ["border-wbGreen","border-wbBlue"]

export const AlbumInput: React.FC<PropsWithChildren<AlbumInputProps>> = ({ children, id, index, value, onNameChange, onPhotoChange }) => {
    const { t } = useTranslation(Namespaces.SUBMIT);
    const shadowColor = shadows[index%2];
    const borderColor = borders[index%2];
    const { ALBUM } = FieldNames;
    const handleNameChange = useCallback((name: string, text: string) => onNameChange(name, text, id), [onNameChange]);
    const handlePhotoChange = useCallback((file:  File) => onPhotoChange(file, id), [onPhotoChange]);
    return (
        <div className={`flex flex-col border border-opacity-55 rounded-lg p-3 mb-4 ${shadowColor} ${borderColor}`}>
            <FormInput name={ALBUM} label={t('albumLabel')} onChange={handleNameChange} value={value} />
            <FileInput name={t('albumPhotoLabel')} type="photo" onChange={handlePhotoChange} />
            { children }
        </div>
    )
}

export default AlbumInput;