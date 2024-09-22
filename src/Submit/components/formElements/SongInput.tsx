'use-client'

import SpanButton from "@/common/components/buttons/SpanButtton";
import FormInput from "@/common/components/formElements/FormInput";
import { FieldNames } from "@/Submit/constants/submitFormConstants";
import FileInput from "@/Submit/components/formElements/FileInput";

interface SongInputProps {
    id: string;
    value: string;
    onNameChange: (name: string, text: string, id?: string) => void;
    onFileChange: (song: File, id: string) => void;
    onRemoveSong: (songId?: string) => void;
}

export const SongInput: React.FC<SongInputProps> = ({ id, value, onNameChange, onFileChange, onRemoveSong }) => {
    const { SONG } = FieldNames;
    const handleNameChange = (name: string, text: string) => onNameChange(name, text, id)
    const handleFileChange = (file: File) => onFileChange(file, id)

    return (
        <div className="flex flex-col border border-wbPink border-opacity-55 rounded-lg p-2 mt-4 mb-1 shadow-pink">
            <FormInput name={SONG} label="Song Name" onChange={handleNameChange} value={value} />
            <FileInput name="Choose song file - mp3 only" type="audio" onChange={handleFileChange} />
            <div className="flex flex-row justify-start p-1">
                <SpanButton text="- Remove Song" id={id} onClick={onRemoveSong} />
            </div>
        </div>
    )
}

export default SongInput;