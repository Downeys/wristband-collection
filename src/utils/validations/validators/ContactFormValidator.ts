import { ContactForm } from "@/types/ContactFormTypes";
import { Validator, ValidatorConfig } from "@/types/SpecificationTypes";
import { isEmailValid, isMessageValid, isNameValid, isPhoneValid } from "../specifications/ContactFormSpecifications";

const validatorConfig: ValidatorConfig<ContactForm> = {
    config: [{
        id: 1,
        specification: isNameValid,
        validationMessage: 'Please enter valid name.'
    },
    {
        id: 2,
        specification: isEmailValid,
        validationMessage: 'Email address is invalid'
    },
    {
        id: 3,
        specification: isPhoneValid,
        validationMessage: 'Phone number is invalid'
    },
    {
        id: 4,
        specification: isMessageValid,
        validationMessage: 'Message is a required field'
    }]
}

export const ContactFormValidator: Validator<ContactForm> = {
    isValid: async (form: ContactForm) => {
        let validationMessages: string[] = [];
        validatorConfig.config.forEach(async (item) => {
            if (!(await item.specification.isSatisfiedBy(form))) {
                validationMessages = [...validationMessages, item.validationMessage ];
            }
        })
        return { isValid: validationMessages.length === 0, validationMessages };
    }
}

export default ContactFormValidator;
