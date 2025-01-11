import { ContactForm } from '@/Contact/types/contactFormTypes';
import { Validator, ValidatorConfig } from '@/common/types/specificationTypes';
import { isNameValid, isEmailValid, isPhoneValid, isMessageValid } from '../specifications/contactFormSpecifications';

const validatorConfig: ValidatorConfig<ContactForm> = {
  config: [
    {
      id: 1,
      specification: isNameValid,
      validationMessage: 'invalidName',
    },
    {
      id: 2,
      specification: isEmailValid,
      validationMessage: 'invalidEmail',
    },
    {
      id: 3,
      specification: isPhoneValid,
      validationMessage: 'invalidPhone',
    },
    {
      id: 4,
      specification: isMessageValid,
      validationMessage: 'invalidMessage',
    },
  ],
};

export const ContactFormValidator: Validator<ContactForm> = {
  isValid: (form: ContactForm) => {
    let validationMessages: string[] = [];
    validatorConfig.config.forEach((item) => {
      if (!item.specification.isSatisfiedBy(form)) {
        validationMessages = [...validationMessages, item.validationMessage];
      }
    });
    return { isValid: validationMessages.length === 0, validationMessages };
  },
};

export default ContactFormValidator;
