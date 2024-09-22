import { Specification } from "@/common/types/specificationTypes"
import { SubmitForm } from "@/Submit/types/submitMusicFormTypes"

export const isBandNameValid: Specification<SubmitForm>  = {
    isSatisfiedBy: async (form: SubmitForm) => form.band?.length > 0
}

export const isContactNameValid: Specification<SubmitForm> = {
    isSatisfiedBy: async (form: SubmitForm) => /^[a-zÀ-ÿ ,.'-]+$/i.test(form.contact)
}

export const isEmailValid: Specification<SubmitForm> = {
    isSatisfiedBy: async (form: SubmitForm) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(form.email)
}

export const isPhoneValid: Specification<SubmitForm> = {
    isSatisfiedBy: async (form: SubmitForm) => !form.phone || /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/i.test(form.phone)
}

export const isEveryAlbumNameValid: Specification<SubmitForm> = {
    isSatisfiedBy: async (form: SubmitForm) => {
        let returnVal = true;
        form.albums.forEach(album => {
            if (!album.name || album.name.length === 0) returnVal=false;
        })
        return returnVal;
    }
}

export const isEveryAlbumPhotoPresent: Specification<SubmitForm> = {
    isSatisfiedBy: async (form: SubmitForm) => {
        let returnVal = true;
        form.albums.forEach(album => {
            if (!album.photo) returnVal=false;
        })
        return returnVal;
    }
}

export const isAtLeastOneSongInEveryAlbum: Specification<SubmitForm> = {
    isSatisfiedBy: async (form: SubmitForm) => {
        let returnVal = true;
        form.albums.forEach(album => {
            if (!album.songs?.length) returnVal=false;
        })
        return returnVal;
    }
}

export const isEverySongNameValid: Specification<SubmitForm> ={
    isSatisfiedBy: async (form: SubmitForm) => {
        let returnVal = true;
        form.albums.forEach(album => {
            album.songs.forEach(song => {
                if (!song.name || song.name.length === 0) returnVal=false;
            })
        })
        return returnVal;
    }
}

export const isEverySongFilePresent: Specification<SubmitForm> = {
    isSatisfiedBy: async (form: SubmitForm) => {
        let returnVal = true;
        form.albums.forEach(album => {
            album.songs.forEach(song => {
                if (!song.file) returnVal=false;
            })
        })
        return returnVal;
    }
}
