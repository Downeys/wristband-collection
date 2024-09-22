import { SubmitForm } from "@/Submit/types/submitMusicFormTypes";

export const getNextIndex = (someArray: any[]) => (someArray[someArray.length -1]?.index ?? 0) + 1;

export const createMusicSubmissionFormData = (form: SubmitForm): FormData => {
    const formData = new FormData();
    formData.append('band', form.band)
    formData.append('contact', form.contact)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    form.albums.forEach(album => {
        formData.append(`albumName-${album.id}`, album.name)
        formData.append(`albumPhoto-${album.id}`, album.photo)
        album.songs.forEach(song => {
            formData.append(`songName-${album.id}-${song.id}`, song.name)
            formData.append(`songFile-${album.id}-${song.id}`, song.file)
        })
    })
    return formData;
}