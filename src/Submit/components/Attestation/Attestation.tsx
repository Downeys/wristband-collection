import React from 'react';
import { Label } from '@/common/components/text/Label';
import { Namespaces } from '@/common/constants/i18nConstants';
import { useTranslation } from 'react-i18next';

interface AttestationProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Attestation = ({ checked, onChange }: AttestationProps) => {
  const { t } = useTranslation(Namespaces.SUBMIT);
  const handleCheckboxClick: React.ChangeEventHandler<HTMLInputElement> = (e) => onChange(e.target.checked);
  return (
    <div className="flex flex-row p-2">
      <input type="checkbox" onChange={handleCheckboxClick} checked={checked} />
      <Label text={t('attestationMessage')} additionalStyles="ml-2" />
    </div>
  );
};

export default Attestation;
