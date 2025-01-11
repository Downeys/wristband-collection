import { Specification } from '@/common/types/specificationTypes';
import { ContactForm } from '@/Contact/types/contactFormTypes';

export const isNameValid: Specification<ContactForm> = {
  isSatisfiedBy: (form: ContactForm) => /^[a-zÀ-ÿ ,.'-]+$/i.test(form.name) && form.name.length > 1,
};

export const isEmailValid: Specification<ContactForm> = {
  isSatisfiedBy: (form: ContactForm) => /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i.test(form.email) && form.email.length > 6,
};

export const isPhoneValid: Specification<ContactForm> = {
  isSatisfiedBy: (form: ContactForm) => !form.phone || /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/i.test(form.phone),
};

export const isMessageValid: Specification<ContactForm> = {
  isSatisfiedBy: (form: ContactForm) => form.message?.length > 1,
};
