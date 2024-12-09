import { SubmitForm, ValidFileType } from "@/Submit/types/submitMusicFormTypes";
import { getFormattedFileName } from "../formatting/fileFormatting";
import { FileType } from "@/Submit/constants/submitFormConstants";

export const getFileType = (file: File): ValidFileType => {
    const splitType = file.type.split('/');
    if (!splitType.length) return FileType.UNKNOWN;
    const returnVal = splitType[0];
    const isValidType = returnVal == FileType.AUDIO || returnVal == FileType.IMAGE  || returnVal == FileType.VIDEO;
    return isValidType ? returnVal : FileType.UNKNOWN;
}

export const getNextIndex = (someArray: any[]) => (someArray[someArray.length -1]?.index ?? 0) + 1;

export const createMusicSubmissionFormData = (form: SubmitForm): FormData => {
    const formData = new FormData();
    formData.append('band', form.band)
    formData.append('contact', form.contact)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('attestation', `${form.ownershipAttestation}`)
    form.imageFiles.forEach(image => {
        formData.append(getFormattedFileName(image.name, getFileType(image)), image)
    })
    form.audioFiles.forEach(song => {
        formData.append(getFormattedFileName(song.name, getFileType(song)), song)
    })
    return formData;
}
