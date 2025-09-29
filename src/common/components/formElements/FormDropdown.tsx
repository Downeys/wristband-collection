import React from 'react'
import Font from '@/common/config/fonts';

interface FormDropdownProps {
    name: string;
    options: string[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({ name, options, onChange }) => {
    return (
        <div className='flex flex-row mb-4'>
            <select className={`${Font.secondary.className} h-9 text-lg font-semibold w-full border-none rounded-lg`} id={name} name={`${name}_selection`} onChange={onChange}>
                {options.map(opt => <option value={opt}>{opt}</option>)}
            </select>
        </div>
    )
}

export default FormDropdown;