'use client'

import React from 'react'
import Label from '@/common/components/text/Label';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/common/constants/i18nConstants';

interface ConfirmationModalProps {
    message: string;
    showModal: boolean;
    onConfirm: () => void;
}

export const ConfirmationModal = ({ message, showModal, onConfirm }: ConfirmationModalProps) => {
    const { t } = useTranslation(Namespaces.COMMON)
    if (!showModal) return null;
    return (
        <div className='absolute top-0 left-0 h-full w-full flex justify-center pt-20 bg-slate-950 bg-opacity-90'>
            <div className='h-60 w-72 flex flex-col justify-center items-center p-6 border border-wbGreen rounded-lg bg-slate-950 shadow-green'>
                <div className='w-full flex justify-center pb-2'>
                    <Label text={message} bold size='lg' alignment='center' />
                </div>
                <div className='w-full flex justify-center p-2 mt-2'>
                    <button className='h-12 w-16 border rounded-lg' onClick={onConfirm}>
                        <Label text={t('okButton')} bold />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;