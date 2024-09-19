import { ContactForm } from "@/types/contactFormTypes";
import { Specification } from "@/types/specificationTypes";

export const isNameValid: Specification<ContactForm> = {
    isSatisfiedBy: async (form: ContactForm) => /^[a-zÀ-ÿ ,.'-]+$/i.test(form.name)
}

export const isEmailValid: Specification<ContactForm> = {
    isSatisfiedBy: async (form: ContactForm) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(form.email)
}

export const isPhoneValid: Specification<ContactForm> = {
    isSatisfiedBy: async (form: ContactForm) => !form.phone || /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/i.test(form.phone)
}

export const isMessageValid: Specification<ContactForm>  = {
    isSatisfiedBy: async (form: ContactForm) => form.message?.length > 1
}
