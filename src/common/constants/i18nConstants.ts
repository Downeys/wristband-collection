export const Namespaces = {
    COMMON: "common",
    HOME: "home",
    CONTACT: "contact",
    SUBMIT: "submit",
    ABOUT: "about"
} as const;

export const DEFAULT_LOCALE = 'en'

export const i18nConstants = { Namespaces, DEFAULT_LOCALE };
export default i18nConstants;