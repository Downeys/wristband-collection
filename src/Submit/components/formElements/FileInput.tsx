"use client"

import { Label } from "@/common/components/text/Label";
import { ChangeEventHandler, MouseEventHandler, useCallback, useMemo, useRef, useState } from "react"

interface FileInputProps {
    name: string;
    type: 'photo' | 'audio';
    onChange: (file: File) => void;
}

const FileInputConfig = {
    photo: "image/x-png,image/jpeg",
    audio: "audio/mp3"
}

export const FileInput: React.FC<FileInputProps> = (props) => {
    const { name, type, onChange } = props;
    const ref = useRef<HTMLInputElement>(null);
    const [state, setState] = useState({ fileName: '' })
    const labelText = useMemo(() => state.fileName.length > 0 ? state.fileName : name, [name, state.fileName])
    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(() => {
        ref.current && ref.current?.click();
    }, [ref])
    const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(() => {
        if (ref.current?.files && ref.current.files.length > 0) {
            const file = ref.current.files[0];
            const fileName = file.name;
            setState({ ...state, fileName })
            onChange(file);
        }
    }, [ref, state, onChange])
    return (
        <div className="h-12 border-2 border-grey rounded-lg flex flex-row justify-center items-center w-full self-end bg-slate-950 cusor-pointer" onClick={handleClick}>
            <input ref={ref} onChange={handleOnChange} type='file' accept={FileInputConfig[type]} hidden/>
            <Label bold font="primary" alignment="center" text={labelText} additionalStyles="w-full" />
        </div>
    )
}

export default FileInput