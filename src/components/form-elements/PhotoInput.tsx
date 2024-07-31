"use client"

import { ChangeEventHandler, MouseEventHandler, MutableRefObject, useCallback, useRef, useState } from "react"
import Label from "../text/Label"

interface PhotoInputProps {
    fileRef: MutableRefObject<any>,
    onChange: (file: File) => void
}

export const PhotoInput: React.FC<PhotoInputProps> = (props) => {
    const { fileRef, onChange } = props;
    const [state, setState] = useState({ fileName: '' })
    const handlePhotoClick: MouseEventHandler<HTMLDivElement> = useCallback(() => {
        fileRef.current && fileRef.current?.click();
    }, [fileRef])
    const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(() => {
        if (fileRef.current?.files.length > 0) {
            const file = fileRef.current.files[0];
            const fileName = `${file.name}`;
            setState({ ...state, fileName })
            onChange(file);
        }
    }, [fileRef, state])
    return (
        <div className="mb-4 h-12 border border-grey rounded flex flex-row items-center" onClick={handlePhotoClick}>
            <input ref={fileRef} onChange={handleOnChange} type='file' accept="image/x-png,image/jpeg" hidden/>
            <Label text="Photo" />
            <span className="w-full flex justify-end">
                <Label text={state.fileName} semibold additionalStyles="mr-4"/>
            </span>
        </div>
    )
}

export default PhotoInput