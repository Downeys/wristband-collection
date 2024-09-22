'use client'

import SpanButton from '@/common/components/buttons/SpanButtton';
import FormInput from '@/common/components/formElements/FormInput';
import ConfirmationModal from '@/common/components/modals/ConfirmationModal';
import FailureModal from '@/common/components/modals/FailureModal';
import Heading from '@/common/components/text/Heading';
import Label from '@/common/components/text/Label';
import FetchService from '@/common/config/FetchService';
import React, { FormEventHandler, MouseEventHandler, useCallback, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import AlbumInput from '@/Submit/components/formElements/AlbumInput';
import SongInput from '@/Submit/components/formElements/SongInput';
import { SubmitState, SubmitForm } from '@/Submit/types/submitMusicFormTypes';
import { createMusicSubmissionFormData, getNextIndex } from '@/Submit/utils/helpers/formHelpers';
import SubmitMusicValidator from '@/Submit/utils/validations/validators/musicFormValidator';
import { FieldNames } from '@/Submit/constants/submitFormConstants';

const initState = {
    band: '',
    contact: '',
    email: '',
    phone: '',
    albums: [{ id: uuidv4(), index: 0, songs: [{ id: uuidv4(), index: 0 }] }],
    validationMessages: [],
    inProgress: false,
    showConfirmationModal: false,
    showFailureModal: false
}

export default function SubmitPage() {
    const [state, setState] = useState<SubmitState>(initState);
    const { BAND, CONTACT, EMAIL, PHONE, ALBUM, SONG } = FieldNames;
    const resetState = () => setState(initState);

    const handleSubmit = useCallback(async () => {
        const form: SubmitForm = {
            band: state.band,
            contact: state.contact,
            email: state.email,
            phone: state.phone,
            albums: state.albums.map(album => 
                ({
                    id: album.id ?? '',
                    name: album.name ?? '',
                    photo: album.photo!,
                    songs: album.songs.map(song => 
                        ({
                            id: song.id ?? '',
                            name: song.name ?? '',
                            file: song.file!
                        }))
                }))
        }
        const { isValid, validationMessages } = SubmitMusicValidator.isValid(form);
        setState({ ...state, validationMessages }); 
        if (isValid) {
            const formData = createMusicSubmissionFormData(form)
            try {
                await FetchService.POST('/api/submissions', formData);
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

    const updateAlbumName = (albumId: string, text: string) => {
        const albumToUpdate = state.albums.filter(album => album.id === albumId)?.[0]
        const updatedAlbum = { ...albumToUpdate, name: text }
        const filteredAlbums = state.albums.filter(album => album.id !== albumId);
        setState({ ...state, albums: [...filteredAlbums, updatedAlbum] })
    }

    const updateSongName = (songId: string, text: string) => {
        const albumToUpdate = state.albums.filter(album => album.songs.map(song => song.id).includes(songId))?.[0]
        const songToUpdate = albumToUpdate.songs.filter(song => song.id === songId)?.[0]
        const updatedSong = { ...songToUpdate, name: text };
        const filteredSongs = albumToUpdate.songs.filter(song => song.id !== songId);
        const updatedAlbum = { ...albumToUpdate, songs: [...filteredSongs, updatedSong] }
        const filteredAlbums = state.albums.filter(album => !album.songs.map(song => song.id).includes(songId))
        setState({ ...state, albums: [...filteredAlbums, updatedAlbum] })
    }

    const handleInputChange = (name: string, text: string, id?: string) => {
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
            case ALBUM:
                updateAlbumName(id!, text);
                break;
            case SONG:
                updateSongName(id!, text);
                break;
            default:
                console.log("Something went wrong")
        }
    }

    const handlePhotoChange = useCallback((file: File, albumId: string) => {
        const albumToUpdate = state.albums.filter(album => album.id === albumId)?.[0]
        const updatedAlbum = { ...albumToUpdate, photo: file }
        const filteredAlbums = state.albums.filter(album => album.id !== albumId);
        setState({ ...state, albums: [...filteredAlbums, updatedAlbum] })
    }, [state]);

    const handleSongChange = useCallback((file: File, songId: string) => {
        const albumToUpdate = state.albums.filter(album => album.songs.map(song => song.id).includes(songId))?.[0]
        const songToUpdate = albumToUpdate.songs.filter(song => song.id === songId)?.[0]
        const updatedSong = { ...songToUpdate, file: file };
        const filteredSongs = albumToUpdate.songs.filter(song => song.id !== songId);
        const updatedAlbum = { ...albumToUpdate, songs: [...filteredSongs, updatedSong] }
        const filteredAlbums = state.albums.filter(album => !album.songs.map(song => song.id).includes(songId))
        setState({ ...state, albums: [...filteredAlbums, updatedAlbum] })
    }, [state]);

    const handleAddSong = useCallback((albumId?: string) => {
        const newIndex = getNextIndex(state.albums.filter(a => a.id === albumId)?.[0].songs);
        const updatedAlbum = state.albums.filter(a => a.id === albumId).map(album => ({ ...album, songs: [...album.songs, { id: uuidv4(), index: newIndex }] }))?.[0];
        const filteredAlbums = state.albums.filter(a => a.id !== albumId);
        setState({ ...state, albums: [...filteredAlbums, updatedAlbum] })
    }, [state]);

    const handleAddAlbum = useCallback(() => {
        const newIndex = getNextIndex(state.albums);
        setState({ ...state, albums: [...state.albums, { id: uuidv4(), index: newIndex, songs: [{ id: uuidv4(), index: 0 }] } ] })
    }, [state]);

    const handleRemoveSong = useCallback((songId: string = "") => {
        const albumToUpdate = state.albums.filter(album => album.songs.map(song => song.id).includes(songId))?.[0];
        const updatedSongList = albumToUpdate.songs.filter(song => song.id !== songId);
        const updatedAlbum = { ...albumToUpdate, songs: updatedSongList }
        const filteredAlbums = state.albums.filter(a => a.id !== updatedAlbum.id);
        setState({ ...state, albums: [...filteredAlbums, updatedAlbum] })
    }, [state]);

    const handleRemoveAlbum = useCallback((albumId: string = "") => {
        const filteredAlbums = state.albums.filter(a => a.id !== albumId);
        setState({ ...state, albums: filteredAlbums })
    }, [state]);

    const handleRetry = useCallback(() => {
        setState({ ...state, showFailureModal: false, inProgress: true });
        handleSubmit();
    }, [state, handleSubmit])

    return (
        <main className="flex min-w-screen min-h-screen flex-col items-center px-8 pt-4 bg-slate-950 relative top-20 z-0">
            <ConfirmationModal message="Songs submitted successfully. Thank you." onConfirm={resetState} showModal={state.showConfirmationModal} />
            <FailureModal message="Failed to submit songs. If issue persists, please report via the contact form. Thank you!" showModal={state.showFailureModal} onCancel={resetState} onRetry={handleRetry} />
            <div className="w-full max-w-screen-sm">
                <Heading size="3xl" text="Submit music" additionalStyles="w-full text-center p-2"/>
                <form onSubmit={handleSubmitEvent} className="my-4">
                    <FormInput name={BAND} label="Band/Artist Name" onChange={handleInputChange} value={state.band} />
                    <FormInput name={CONTACT} label="Contact Person Name" onChange={handleInputChange} value={state.contact} />
                    <FormInput name={EMAIL} type="email" label="Contact Email" onChange={handleInputChange} value={state.email} />
                    <FormInput name={PHONE} type="tel" label="Phone Number (optional)" onChange={handleInputChange} value={state.phone} />
                    {state.albums.sort((a, b) => a.index - b.index).map((album) => (
                        <AlbumInput key={album.id} id={album.id} index={album.index} value={album.name ?? ''} onNameChange={handleInputChange} onPhotoChange={handlePhotoChange}>
                            {album.songs.sort((a, b) => a.index - b.index).map((song) => (<SongInput key={song.id} id={song.id} value={song.name ?? ''} onNameChange={handleInputChange} onFileChange={handleSongChange} onRemoveSong={handleRemoveSong} />))}
                            <div className="p-2 flex flex-row justify-between" >
                                <SpanButton text="- Remove Album" id={album.id} onClick={handleRemoveAlbum} />
                                <SpanButton text="+ Add Song" id={album.id} onClick={handleAddSong} />
                            </div>
                        </AlbumInput>)
                    )}
                    <div className="flex flex-row justify-end">
                        <SpanButton text="+ Add Album" onClick={handleAddAlbum} />
                    </div>
                    <div className="mb-6 flex flex-col">
                        {state.validationMessages.map(message => <Label key={uuidv4()} text={`- ${message}`} color="red" />)}
                    </div>
                    <div className="flex w-full justify-center items-center">
                        <button type="submit" onClick={handleSubmitClick} className="border-2 border-wbPink rounded-2xl py-3 w-1/2 shadow-pink">
                            <Label text="Submit" bold size="2xl"/>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
