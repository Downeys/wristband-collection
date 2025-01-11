import { Specification } from '@/common/types/specificationTypes';
import { SubmitForm } from '@/Submit/types/submitMusicFormTypes';

export const isBandNameValid: Specification<SubmitForm> = {
  isSatisfiedBy: (form: SubmitForm) => form.band?.length > 0,
};

export const isContactNameValid: Specification<SubmitForm> = {
  isSatisfiedBy: (form: SubmitForm) => /^[a-zÀ-ÿ ,.'-]+$/i.test(form.contact),
};

export const isEmailValid: Specification<SubmitForm> = {
  isSatisfiedBy: (form: SubmitForm) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(form.email),
};

export const isPhoneValid: Specification<SubmitForm> = {
  isSatisfiedBy: (form: SubmitForm) => !form.phone || /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/i.test(form.phone),
};

export const isAtLeastOneSongPresent: Specification<SubmitForm> = {
  isSatisfiedBy: (form: SubmitForm) => form.audioFiles.length > 0,
};

export const isAtLeastOneImagePresent: Specification<SubmitForm> = {
  isSatisfiedBy: (form: SubmitForm) => form.imageFiles.length > 0,
};

export const isAttestationChecked: Specification<SubmitForm> = {
  isSatisfiedBy: (form: SubmitForm) => form.ownershipAttestation,
};
