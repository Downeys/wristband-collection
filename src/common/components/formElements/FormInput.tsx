'use client';

import React from 'react';
import { ChangeEventHandler, useCallback } from 'react';
import Font from '@/common/config/fonts';

interface FormInputProps {
  name: string;
  type?: 'text' | 'tel' | 'email';
  label: string;
  value: string;
  onChange: (name: string, text: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({ label, type, name, value, onChange }) => {
  const inputType = type ?? 'text';
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange(name, e.target.value);
    },
    [name, onChange]
  );
  return (
    <div className="flex flex-row mb-4">
      <input className={`${Font.secondary.className} text-lg font-semibold placeholder-black outline-none focus:outline-none w-full p-1 border-none rounded-lg`} type={inputType} onChange={handleOnChange} placeholder={label} value={value} />
    </div>
  );
};

export default FormInput;
