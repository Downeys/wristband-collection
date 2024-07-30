'use client'

import SpanButton from "@/components/buttons/SpanButtton";
import AlbumInput from "@/components/form-elements/AlbumInput";
import FormInput from "@/components/form-elements/FormInput";
import SongInput from "@/components/form-elements/SongInput";
import Heading from "@/components/text/Heading";
import Label from "@/components/text/Label";
import { createMusicSubmissionFormData, getNextIndex } from "@/utils/helpers/FormHelpers";
import { FormEventHandler, MouseEventHandler, useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import constants from '@/static-data/SubmitFormConstants';
import { SubmitState, SubmitForm } from "@/types/SubmitMusicFormTypes";
import SubmitMusicValidator from "@/utils/validations/validators/MusicFormValidator";
import FetchService from "@/config/FetchService";

const initState = {
    band: '',
    contact: '',
    email: '',
    phone: '',
    albums: [{ id: uuidv4(), index: 0, songs: [{ id: uuidv4(), index: 0 }] }],
    validationMessages: [],
    inProgress: false
}

export default function Submit({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [state, setState] = useState<SubmitState>(initState);
    const { BAND, CONTACT, EMAIL, PHONE, ALBUM, SONG } = constants.FieldNames;
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
        const { isValid, validationMessages } = await SubmitMusicValidator.isValid(form);
        setState({ ...state, validationMessages }); 
        if (isValid) {
            const formData = createMusicSubmissionFormData(form)
            await FetchService.POST('/api/submissions', formData);
            resetState();
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

    return (
        <div className="flex min-w-screen min-h-screen flex-col items-center px-12 pt-4 bg-slate-950 relative top-20 z-0">
            <div className="w-full max-w-screen-sm">
                <Heading size="3xl" text="Submit music" additionalStyles="w-full text-center p-2"/>
                <form onSubmit={handleSubmitEvent} className="my-4">
                    <FormInput name={BAND} label="Band/Artist Name" onChange={handleInputChange}/>
                    <FormInput name={CONTACT} label="Contact Person Name" onChange={handleInputChange}/>
                    <FormInput name={EMAIL} type="email" label="Contact Email" onChange={handleInputChange}/>
                    <FormInput name={PHONE} type="tel" label="Phone Number (optional)" onChange={handleInputChange}/>
                    {state.albums.sort((a, b) => a.index - b.index).map((album) => (
                        <AlbumInput key={album.id} id={album.id} index={album.index} onNameChange={handleInputChange} onPhotoChange={handlePhotoChange}>
                            {album.songs.sort((a, b) => a.index - b.index).map((song) => (<SongInput key={song.id} id={song.id} onNameChange={handleInputChange} onFileChange={handleSongChange} onRemoveSong={handleRemoveSong} />))}
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
                        <button type="submit" onClick={handleSubmitClick} className="border border-wbPink border-white rounded-2xl py-3 w-1/2 shadow-pink">
                            <Label text="Submit" bold size="2xl"/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
  }