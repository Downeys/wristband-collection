import React from 'react'
import Font from '../../../config/fonts';
import styles from './FormDropdown.module.scss';

interface FormDropdownProps {
    name: string;
    options: string[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({ name, options, onChange }) => {
    return (
        <div className={styles.formDropdownContainer}>
            <select className={`${Font.secondary.className} ${styles.formDropdown}`} id={name} name={`${name}_selection`} onChange={onChange}>
                {options.map(opt => <option value={opt}>{opt}</option>)}
            </select>
        </div>
    )
}

export default FormDropdown;