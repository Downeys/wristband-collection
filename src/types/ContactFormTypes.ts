export interface ContactState {
    name: string;
    email: string;
    phone: string;
    message: string;
    validationMessages: string[];
    inProgress: boolean;
}

export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    message: string;
}
