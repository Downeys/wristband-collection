import SpanButton from "../buttons/SpanButtton";
import FileInput from "./FileInput";
import FormInput from "./FormInput";
import constants from "@/static-data/SubmitFormConstants";

interface SongInputProps {
    id: string;
    value: string;
    onNameChange: (name: string, text: string, id?: string) => void;
    onFileChange: (song: File, id: string) => void;
    onRemoveSong: (songId?: string) => void;
}

export const SongInput: React.FC<SongInputProps> = ({ id, value, onNameChange, onFileChange, onRemoveSong }) => {
    const { SONG } = constants.FieldNames;
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