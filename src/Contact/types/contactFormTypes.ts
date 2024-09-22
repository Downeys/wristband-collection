export interface ContactState {
    name: string;
    email: string;
    phone: string;
    message: string;
    validationMessages: string[];
    inProgress: boolean;
    showConfirmationModal: boolean;
    showFailureModal: boolean;
}

export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    message: string;
}
