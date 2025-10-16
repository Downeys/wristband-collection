'use client';

import React, { ChangeEventHandler, useCallback } from 'react';
import Font from '../../../config/fonts';
import styles from './FormInput.module.scss';

interface FormInputProps {
  name: string;
  type?: 'text' | 'tel' | 'email';
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (name: string, text: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({ label, type, name, value, disabled, onChange }) => {
  const inputType = type ?? 'text';
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange(name, e.target.value);
    },
    [name, onChange]
  );
  return (
    <div className={styles.formInputContainer}>
      <input className={`${Font.secondary.className} ${styles.formInput}`} type={inputType} onChange={handleOnChange} placeholder={label} value={value} disabled={disabled} />
    </div>
  );
};

export default FormInput;
