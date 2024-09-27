import { SubmitForm } from "@/Submit/types/submitMusicFormTypes";
import { isBandNameValid, isContactNameValid, isEmailValid, isPhoneValid, isEveryAlbumNameValid, isEveryAlbumPhotoPresent, isEverySongNameValid, isEverySongFilePresent, isAtLeastOneSongInEveryAlbum } from "@/Submit/utils/validations/specifications/musicFormSpecifications";
import { Validator, ValidatorConfig } from "@/common/types/specificationTypes";

const validatorConfig: ValidatorConfig<SubmitForm> ={
    config: [{
        id: 1,
        specification: isBandNameValid,
        validationMessage: 'invalidBand'
    },
    {
        id: 2,
        specification: isContactNameValid,
        validationMessage: 'invalidContact'
    },
    {
        id: 3,
        specification: isEmailValid,
        validationMessage: 'invalidEmail'
    },
    {
        id: 4,
        specification: isPhoneValid,
        validationMessage: 'invalidPhone'
    },
    {
        id: 5,
        specification: isEveryAlbumNameValid,
        validationMessage: 'invalidAlbumName'
    },
    {
        id: 6,
        specification: isEveryAlbumPhotoPresent,
        validationMessage: 'invalidAlbumPhoto'
    },
    {
        id: 7,
        specification: isEverySongNameValid,
        validationMessage: 'invalidSongName'
    },
    {
        id: 8,
        specification: isEverySongFilePresent,
        validationMessage: 'invalidSongFile'
    },
    {
        id: 9,
        specification: isAtLeastOneSongInEveryAlbum,
        validationMessage: 'albumMissingSong'
    }]
}

export const SubmitMusicValidator: Validator<SubmitForm> = {
    isValid: (form: SubmitForm) => {
        let validationMessages: string[] = [];
        validatorConfig.config.forEach((item) => {
            if (!(item.specification.isSatisfiedBy(form))) {
                validationMessages = [...validationMessages, item.validationMessage ];
            }
        })
        return { isValid: validationMessages.length === 0, validationMessages };
    }
}

export default SubmitMusicValidator;