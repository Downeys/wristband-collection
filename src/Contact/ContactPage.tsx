'use client';

import FormInput from '@/common/components/formElements/FormInput';
import ConfirmationModal from '@/common/components/modals/ConfirmationModal';
import FailureModal from '@/common/components/modals/FailureModal';
import Heading from '@/common/components/text/Heading';
import Label from '@/common/components/text/Label';
import Font from '@/common/config/fonts';
import { v4 as uuidv4 } from 'uuid';
import React, { ChangeEventHandler, FormEventHandler, MouseEventHandler, useCallback, useState } from 'react';
import { ContactState, ContactForm } from '@/Contact/types/contactFormTypes';
import { FieldNames, UNRECOGNIZED_FIELD_MESSAGE } from '@/Contact/constants/contactFormConstants';
import { ContactFormValidator } from './utils/validations/validators/contactFormValidator';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/common/constants/i18nConstants';
import { CONTACT_URI } from './constants/apiConstants';
import fetchService from '@/common/config/FetchService';

const initState: ContactState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  inProgress: false,
  validationMessages: [],
  showConfirmationModal: false,
  showFailureModal: false,
};

export default function ContactPage() {
  const { NAME, EMAIL, PHONE, MESSAGE } = FieldNames;
  const [state, setState] = useState<ContactState>(initState);
  const { t } = useTranslation(Namespaces.CONTACT);
  const resetState = () => setState(initState);

  const handleSubmit = useCallback(async () => {
    const form: ContactForm = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      message: state.message,
    };
    const { isValid, validationMessages } = ContactFormValidator.isValid(form);
    setState({ ...state, validationMessages });
    if (isValid) {
      try {
        await fetchService.POST(CONTACT_URI, JSON.stringify(form), 'application/json');
        setState({ ...state, showConfirmationModal: true });
      } catch (e) {
        setState({ ...state, showFailureModal: true });
      }
    }
  }, [state]);

  const handleSubmitEvent: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      setState({ ...state, inProgress: true });
      handleSubmit();
    },
    [state, handleSubmit]
  );

  const handleSubmitClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      setState({ ...state, inProgress: true });
      handleSubmit();
    },
    [state, handleSubmit]
  );

  const handleInputChange = useCallback(
    (name: string, text: string, id?: string) => {
      switch (name) {
        case NAME:
          setState({ ...state, name: text });
          break;
        case EMAIL:
          setState({ ...state, email: text });
          break;
        case PHONE:
          setState({ ...state, phone: text });
          break;
        default:
          console.log(UNRECOGNIZED_FIELD_MESSAGE);
      }
    },
    [state, NAME, EMAIL, PHONE]
  );

  const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      setState({ ...state, message: e.target.value });
    },
    [state]
  );

  const handleRetry = useCallback(() => {
    setState({ ...state, showFailureModal: false, inProgress: true });
    handleSubmit();
  }, [state, handleSubmit]);

  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center px-8 pt-4 bg-slate-950 relative top-20 z-0">
      <ConfirmationModal message={t('successMessage')} onConfirm={resetState} showModal={state.showConfirmationModal} />
      <FailureModal message={t('failureMessage')} showModal={state.showFailureModal} onCancel={resetState} onRetry={handleRetry} />
      <div className="w-full max-w-screen-sm">
        <Heading size="3xl" text={t('pageHeading')} additionalStyles="w-full text-center p-2" />
        <form onSubmit={handleSubmitEvent} className="my-4">
          <FormInput name={NAME} label={t('nameLabel')} onChange={handleInputChange} value={state.name} />
          <FormInput name={EMAIL} type="email" label={t('emailLabel')} onChange={handleInputChange} value={state.email} />
          <FormInput name={PHONE} type="tel" label={t('phoneLabel')} onChange={handleInputChange} value={state.phone} />
          <textarea
            name={MESSAGE}
            placeholder={t('messageLabel')}
            onChange={handleTextAreaChange}
            value={state.message}
            className={`${Font.secondary.className} text-lg font-semibold placeholder-black outline-none focus:outline-none h-60 w-full p-1 border-none rounded-lg`}
          />
          <div className="mb-6 flex flex-col">
            {state.validationMessages.map((message) => (
              <Label key={uuidv4()} text={t(message)} color="red" />
            ))}
          </div>
          <div className="flex w-full justify-center items-center">
            <button type="submit" onClick={handleSubmitClick} className="border-2 border-wbPink rounded-2xl py-3 w-1/2 shadow-pink">
              <Label text={t('submitButton')} bold size="2xl" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
